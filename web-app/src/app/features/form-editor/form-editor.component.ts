import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { FormService } from '../form/services/form.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormShareComponent } from '../../shared/components/form-share/form-share.component';

@Component({
  selector: 'app-formEditor',
  templateUrl: './form-editor.component.html',
})
export class FormEditorComponent implements OnInit, OnDestroy {

  private formId: string;
  public form: any;
  public loading: boolean = false;
  public formStatus: string = 'saved';
  public linkForm: string;
  private shareDialog: DynamicDialogRef<FormShareComponent>;
  private subs: Subscription = new Subscription();


  constructor(
    private readonly messageService: MessageService,
    private readonly formService: FormService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly dialogService: DialogService,
  ) {
    this.formId = route.snapshot.paramMap.get('id');
    const baseUrl = window.location.origin;
    this.linkForm = baseUrl + '/#' + router.serializeUrl(router.createUrlTree(['/forms/' + this.formId + '/view']));
  }

  ngOnInit(): void {
    this.getForm();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
    if (this.shareDialog) {
      this.shareDialog.destroy();
    }
  }

  showShare(): void {
    this.shareDialog = this.dialogService.open(FormShareComponent, {
      header: 'Share form',
      width: '50%',
      position: 'top',
      data: {
        formId: this.formId
      }
    });
  }

  private getForm(): void {
    this.subs.add(
      this.formService.show(this.formId).subscribe({
        next: (res) => {
          this.form = res.payload;
        }, error: (err) => {
          this.messageService.add({
            severity: 'error',
            detail: err.error.message || 'Error loading form'
          });
          this.router.navigate(['/notfound']);
        }
      })
    );
  }

  public exitForm(): void {
    this.router.navigate(['/forms']);
  }

  public seeForm(): void {
    const url = this.router.serializeUrl(this.router.createUrlTree(['/forms/view', this.formId]));
    window.open(url, '_blank');
  }


}
