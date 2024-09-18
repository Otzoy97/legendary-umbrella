import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { FormItemService } from '../../services/form-item.service';
import { FormItem } from '../../../../shared/interfaces/form-item.interface';

@Component({
  selector: 'app-formEditorControList',
  templateUrl: './form-control-list.component.html',
})
export class FormEditorControlListComponent implements OnInit {

  public formId: string;
  public formItems: FormItem[] = [];
  public loading: boolean = true;

  constructor(
    private readonly formItemService: FormItemService,
    private readonly messageService: MessageService,
  ) {
    this.formId = inject(ActivatedRoute).snapshot.paramMap.get('id');
  }

  ngOnInit(): void {

    this.loadItems();
  }

  loadItems(): void {
    this.formItemService.index(this.formId).subscribe({
      next: (res) => {
        this.formItems = res.payload;
      }, error: (err) => {
        this.messageService.add({
          severity: 'error',
          detail: err.error.message || 'Error loading items'
        });
      }, complete: () => this.loading = false
    });
  }

  addItem(): void {
    const data = {
      name: 'new item',
      required: false,
      type: 'text'
    }
    this.formItemService.create(this.formId, data).subscribe({
      next: (res) => {
        this.formItems.push(res.payload);
        this.messageService.add({
          severity: 'success',
          detail: 'Form saved'
        })
      }, error: (err) => {
        this.messageService.add({
          severity: 'error',
          detail: err.error.message || 'Error adding item'
        });
      }
    });
  }

  removeItem(id: number): void {
    this.formItemService.delete(id).subscribe({
      next: (_) => {
        this.formItems = this.formItems.filter(item => item.id !== id);
        this.messageService.add({
          severity: 'success',
          detail: 'Form saved'
        })
      }, error: (err) => {
        this.messageService.add({
          severity: 'error',
          detail: err.error.message || 'Error removing item'
        });
      }
    });
  }
}