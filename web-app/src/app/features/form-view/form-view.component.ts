import { Component, OnInit } from '@angular/core';
import { Form } from '../../shared/interfaces/form.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { FormService } from '../form/services/form.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormResponseService } from '../form-response/services/form-response.service';
import { FormItem } from '../../shared/interfaces/form-item.interface';
import { FormItemService } from '../form-editor/services/form-item.service';
import { FormResponseCreate } from '../../shared/interfaces/form-response.interface';

@Component({
  selector: 'app-formView',
  templateUrl: './form-view.component.html',
})
export class FormViewComponent implements OnInit {

  public form: Form;
  private formId: string;
  public formItems: FormItem[];
  public formGroup: FormGroup;
  public loadingPage: boolean = true;
  public formSent: boolean = false;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly formResponseService: FormResponseService,
    private readonly formItemService: FormItemService,
    private readonly messageService: MessageService,
    private readonly formService: FormService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.formId = this.route.snapshot.paramMap.get('id');
    this.loadForm();
    this.loadItems();
  }

  private loadForm(): void {
    this.formService.show(this.formId).subscribe({
      next: (res) => {
        this.form = res.payload;
      }, error: (err) => {
        this.messageService.add({
          severity: 'error',
          detail: err.error.message || 'An error occurred while loading the form'
        });
        this.router.navigate(['/notfound']);
      }
    });
  }

  private loadItems(): void {
    this.formItemService.index(this.formId).subscribe({
      next: (res) => {
        this.formItems = res.payload;
        const formControls = {};
        res.payload.forEach((item) => {
          if (item.required) {
            formControls[item.id] = new FormControl(null, [Validators.required]);
          } else {
            formControls[item.id] = new FormControl(null);
          }
        });
        this.formGroup = this.formBuilder.group(formControls, { updateOn: 'change' });
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


  submit(): void {
    if (this.formGroup.invalid) {
      this.messageService.add({
        severity: 'error',
        detail: 'Please fill all required fields'
      });
      return;
    }

    const formResponse: FormResponseCreate = {
      items: Object.keys(this.formGroup.controls).map((id) => {
        return {
          id: +id,
          value: this.formGroup.get(id)?.value
        }
      })
    };

    console.log(formResponse);

    this.formResponseService.create(this.formId, formResponse).subscribe({
      next: (res) => {
        this.messageService.add({
          severity: 'success',
          detail: 'Form submitted successfully'
        });
        this.formSent = true;
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          detail: err.error.message || 'An error occurred'
        });
      }
    });
  }

  control(id: string): FormControl {
    return this.formGroup.get(id) as FormControl;
  }

  resetForm(): void {
    this.formGroup.reset();
    this.formSent = false;
  }
}
