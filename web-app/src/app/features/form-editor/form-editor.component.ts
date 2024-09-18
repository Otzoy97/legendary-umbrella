import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { FormService } from '../form/services/form.service';

@Component({
  selector: 'app-formEditor',
  templateUrl: './form-editor.component.html',
})
export class FormEditorComponent implements OnInit, OnDestroy {

  private formId: string;
  public form: any;
  public loading: boolean = false;
  public shareVisible: boolean = false;
  public formStatus: string = 'saved';
  public linkForm: string;
  private subs: Subscription = new Subscription();

  constructor(
    private readonly messageService: MessageService,
    private readonly formService: FormService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
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
  }

  copyInputMessage(inputElement) {
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
  }

  public showShare(): void {
    this.shareVisible = true;
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
