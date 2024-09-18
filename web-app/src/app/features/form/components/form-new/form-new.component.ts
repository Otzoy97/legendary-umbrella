import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { FormService } from '../../services/form.service';

@Component({
  selector: 'app-form-new',
  templateUrl: './form-new.component.html',
})
export class FormNewComponent implements OnInit, OnDestroy {

  public formDetails: FormGroup;
  private subs: Subscription = new Subscription();

  constructor(
    private readonly router: Router,
    public readonly ref: DynamicDialogRef,
    private readonly messageService: MessageService,
    private readonly formBuilder: FormBuilder,
    private readonly formService: FormService
  ) { }

  ngOnInit(): void {
    this.formDetails = this.formBuilder.group({
      name: [null, Validators.required],
      description: [null]
    });
  }

  get name(): AbstractControl {
    return this.formDetails.get('name');
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  save(): void {
    if (!this.formDetails.valid) {
      this.messageService.add({
        severity: 'warn',
        detail: 'Please fill the fields correctly'
      })
      return;
    }

    this.subs.add(
      this.formService.create(this.formDetails.value).subscribe({
        next: (res) => {
          this.messageService.add({
            severity: 'success',
            detail: 'Form created successfully'
          });
          this.ref.close(this.formDetails.value);
          this.router.navigate(['/forms/' + res.payload.id + '/editor']);
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            detail: err.error.message
          });
        }
      })
    );
  }

}
