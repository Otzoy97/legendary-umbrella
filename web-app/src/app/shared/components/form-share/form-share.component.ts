import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormService } from '../../../features/form/services/form.service';

@Component({
  selector: 'app-formShare',
  templateUrl: './form-share.component.html',
})
export class FormShareComponent implements OnInit {
  public linkForm: string;

  constructor(
    public readonly ref: DynamicDialogRef,
    public readonly config: DynamicDialogConfig,
    private readonly messageService: MessageService,
    private readonly router: Router,
  ) { }

  ngOnInit(): void {
    const baseUrl = window.location.origin;
    const urlAddon = this.router.serializeUrl(this.router.createUrlTree(['/forms/' + this.config.data.formId + '/view']));
    this.linkForm = baseUrl + '/#' + urlAddon;
  }

  copyInputMessage(inputElement: any) {
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
    this.messageService.add({
      severity: 'info',
      detail: 'Link copied to clipboard'
    })
  }
}
