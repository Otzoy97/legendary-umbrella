import { Component, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table, TableLazyLoadEvent } from 'primeng/table';
import { TableColumn } from '../../../../shared/interfaces/table-column';
import { FormService } from '../../services/form.service';

@Component({
  selector: 'app-formIndexTable',
  templateUrl: './index-table.component.html'
})
export class FormIndexTableComponent {

  public cols: TableColumn[];
  public loading: boolean = true;
  public totalRecords: number = 0;
  public forms: any[] = [];

  constructor(
    private readonly formService: FormService,
    private readonly messageService: MessageService,
  ) {
    this.cols = [
      { field: 'name', header: 'Name' },
      { field: 'createdBy', header: 'Created By' },
      { field: 'updatedBy', header: 'Updated By' },
      { field: 'createdAt', header: 'Created At' },
      { field: 'updatedAt', header: 'Updated At' }
    ];
  }

  index(event: TableLazyLoadEvent) {
    let rows = event.rows;
    let first = event.first;
    this.loading = true;

    const queryParams = {
      page: (first / rows) + 1,
      page_size: rows,
    }

    this.formService.index(queryParams).subscribe({
      next: (res) => {
        this.forms = res.payload.data;
        this.totalRecords = res.payload.total;
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          detail: err.error.message
        });
      },
      complete: () => this.loading = false
    })
  }

}
