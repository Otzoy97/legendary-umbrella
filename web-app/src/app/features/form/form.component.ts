import { Component, OnDestroy, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormNewComponent } from './components/form-new/form-new.component';
import { BreadcrumbService } from '../../core/components/breadcrumb/breadcrumb.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
})
export class FormComponent implements OnInit, OnDestroy {

  private newDialog: DynamicDialogRef<FormNewComponent>;

  constructor(
    private readonly dialogService: DialogService,
    private readonly breadcrumbService: BreadcrumbService,
  ) { }

  ngOnInit(): void {
    this.breadcrumbService.setItems([
      { label: 'Forms' },
    ]);
  }

  ngOnDestroy(): void {
    if (this.newDialog) {
      this.newDialog.destroy();
    }
  }

  openNew(): void {
    this.newDialog = this.dialogService.open(FormNewComponent, {
      header: 'New form',
      width: '400px',
      height: '400px'
    });
  }
}
