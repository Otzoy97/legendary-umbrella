import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { FormItem } from '../../../../shared/interfaces/form-item.interface';
import { FormResponseService } from '../../services/form-response.service';
import { FormItemService } from '../../../form-editor/services/form-item.service';

@Component({
  selector: 'app-formResponseReview',
  templateUrl: './form-show.component.html'
})
export class FormResponseReviewComponent implements OnInit {

  @Input() public formResponseId!: string;
  public formId!: string;
  public formItems: FormItem[];
  public formGroup: FormGroup;
  public loadingPage: boolean = true;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly formResponseService: FormResponseService,
    private readonly formItemService: FormItemService,
    private readonly messageService: MessageService,
    public readonly router: Router,
    public readonly route: ActivatedRoute
  ) {
    this.formId = route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.loadItems();
    this.loadReponses();
  }

  private loadItems(): void {
    this.formItemService.index(this.formId).subscribe({
      next: (res) => {
        this.formItems = res.payload;
        const formControls = {};
        this.formItems.forEach((formItem) => {
          formControls[formItem.id] = new FormControl();
        });
        this.formGroup = this.formBuilder.group(formControls);
        this.formGroup.disable();
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          detail: err.error.message || 'An error occurred'
        });
      }
    });
  }

  private loadReponses(): void {
    this.formResponseService.show(this.formResponseId).subscribe({
      next: (res) => {
        // Set the values of the form controls
        res.payload.responseItems.forEach((responseItem) => {
          if (responseItem.item.type === 'date') {
            responseItem.value = new Date(responseItem.value);
          }
          this.formGroup.get(responseItem.item.id + '').setValue(responseItem.value);
        });
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          detail: err.error.message || 'An error occurred'
        });
      },
      complete: () => this.loadingPage = false
    });
  }

  control(id: number): FormControl {
    return this.formGroup.get(id + '') as FormControl;
  }
}