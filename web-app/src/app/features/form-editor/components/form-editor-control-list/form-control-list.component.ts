import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { FormItemService } from '../../services/form-item.service';

@Component({
  selector: 'app-formEditorControList',
  templateUrl: './form-control-list.component.html',
})
export class FormEditorControlListComponent implements OnInit {

  public formId: string;
  public formItems: any[] = [];
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
      }, error: (err) => {
        this.messageService.add({
          severity: 'error',
          detail: err.error.message || 'Error removing item'
        });
      }
    });
  }

  moveItemDown(index: number): void {
    const item = this.formItems[index];
    if (index < this.formItems.length - 1) {
      return;
    }
    this.formItemService.update(item.id, { order: item.order + 1 }).subscribe({
      next: (_) => {
        // Swap order with next item
        [this.formItems[index], this.formItems[index + 1]] = [this.formItems[index + 1], this.formItems[index]];
      }, error: (err) => {
        this.messageService.add({
          severity: 'error',
          detail: err.error.message || 'Error moving item'
        });
      }
    });
  }

  moveItemUp(index: number): void {
    const item = this.formItems[index];
    if (index > 0) {
      return;
    }
    this.formItemService.update(item.id, { order: item.order - 1 }).subscribe({
      next: (_) => {
        // Swap order with previous item
        [this.formItems[index], this.formItems[index - 1]] = [this.formItems[index - 1], this.formItems[index]];
      }, error: (err) => {
        this.messageService.add({
          severity: 'error',
          detail: err.error.message || 'Error moving item'
        });
      }
    });
  }

}