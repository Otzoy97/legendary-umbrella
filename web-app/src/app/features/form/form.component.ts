import { Component, OnDestroy, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormNewComponent } from './components/form-new/form-new.component';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
})
export class FormComponent implements OnDestroy {

  private newDialog: DynamicDialogRef<FormNewComponent>;

  constructor(
    private readonly dialogService: DialogService,
  ) { }

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
