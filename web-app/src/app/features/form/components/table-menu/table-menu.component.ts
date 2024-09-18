import { Component, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BehaviorSubject, Subscription } from 'rxjs';
import { LoadService } from '../../../../core/services/load.service';
import { FormService } from '../../services/form.service';
import { FormUpdateComponent } from '../form-update/form-update.component';
import { Form } from '../../../../shared/interfaces/form.interface';

@Component({
  selector: 'app-formIndexTableMenu',
  templateUrl: './table-menu.component.html',
})
export class FormIndexTableMenuComponent implements OnDestroy {

  @Input() form: Form;
  public menuItems$: BehaviorSubject<MenuItem[]> = new BehaviorSubject<MenuItem[]>([]);
  private subs: Subscription = new Subscription();
  private updateDialog: DynamicDialogRef<FormUpdateComponent>;

  constructor(
    private readonly router: Router,
    private readonly loadService: LoadService,
    private readonly messageService: MessageService,
    private readonly formService: FormService,
    private readonly dialogService: DialogService,
    private readonly confirmService: ConfirmationService
  ) { }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
    if (this.updateDialog) {
      this.updateDialog.destroy();
    }
  }

  showMenu(form: any): void {
    const items: MenuItem[] = [
      {
        label: 'Edit items',
        icon: 'pi pi-file-edit',
        command: () => this.edit(form)
      },
      {
        label: 'Update details',
        icon: 'pi pi-pen-to-square',
        command: () => this.update(form)
      },
      {
        label: 'Delete',
        icon: 'pi pi-trash',
        command: () => this.confirmDelete(form)
      }
    ];
    this.menuItems$.next(items);
  }

  private edit(form: any): void {
    this.router.navigate(['forms', form.id, 'editor']);
  }

  update(form: any) {
    this.updateDialog = this.dialogService.open(FormUpdateComponent, {
      header: 'Update form details',
      width: '400px',
      height: '400px',
      data: {
        id: form.id,
        name: form.name,
        description: form.description
      }
    });
    this.subs.add(
      this.updateDialog.onClose.subscribe({
        next: (res: any) => {
          if (res) {
            form.name = res.name;
            form.description = res.description;
          }
        }
      })
    );
  }

  confirmDelete(form: any): void {
    this.confirmService.confirm({
      message: 'Are you sure you want to delete this form?<br><br>This action cannot be undone.',
      header: 'Delete Form',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Yes',
      rejectLabel: 'No',
      accept: () => this.delete(form)
    });
  }

  private delete(form: any): void {
    this.subs.add(
      this.formService.delete(form.id).subscribe({
        next: (res) => {
          this.messageService.add({
            severity: 'success',
            detail: res.message || 'Form deleted successfully'
          });
          this.loadService.emitEvent('FormIndex', true);
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
