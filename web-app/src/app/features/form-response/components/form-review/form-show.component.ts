import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { FormItem } from '../../../../shared/interfaces/form-item.interface';
import { FormResponseService } from '../../services/form-response.service';

@Component({
  selector: 'app-formResponseReview',
  templateUrl: './form-show.component.html'
})
export class FormResponseReviewComponent implements OnInit {

  @Input() public formResponseId!: string;
  public formItems: FormItem[];
  public formGroup: FormGroup;
  public loadingPage: boolean = true;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly formResponseService: FormResponseService,
    private readonly messageService: MessageService,
    public readonly router: Router,
  ) { }

  ngOnInit(): void {
    this.loadReponses();
  }

  private loadReponses(): void {
    this.formResponseService.show(this.formResponseId).subscribe({
      next: (res) => {
        // Extract the items from the responseItems
        this.formItems = res.payload.responseItems.map((responseItem) => {
          return responseItem.item;
        });
        const formControls = {};
        res.payload.responseItems.forEach((responseItem) => {
          formControls[responseItem.item.id] = new FormControl(responseItem.value);
        });
        this.formGroup = this.formBuilder.group(formControls);
        this.formGroup.disable();
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