import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormService } from '../../services/form.service';

@Component({
  selector: 'app-form-update',
  templateUrl: './form-update.component.html',
})
export class FormUpdateComponent implements OnInit {

  public id_form: string;
  public formDetails: FormGroup;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private formService: FormService
  ) { }

  ngOnInit(): void {
    this.id_form = this.config.data.id;
    this.formDetails = this.formBuilder.group({
      name: [this.config.data.name, Validators.required],
      description: [this.config.data.description]
    }, {
      updateOn: 'change'
    });
  }

  get name(): AbstractControl {
    return this.formDetails.get('name');
  }

  save(): void {
    if (!this.formDetails.valid) {
      this.messageService.add({
        severity: 'warn',
        detail: 'Please fill the fields correctly'
      })
      return;
    }
    this.formService.update(this.id_form, this.formDetails.value).subscribe({
      next: (res) => {
        this.messageService.add({
          severity: 'success',
          detail: res.message || 'Form updated successfully'
        });
        this.ref.close(this.formDetails.value);
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          detail: err.error.message
        });
      }
    });
  }

}
