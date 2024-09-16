import { Component, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table, TableLazyLoadEvent } from 'primeng/table';
import { TableColumn } from '../../../../core/interfaces/table-column';
import { FormService } from '../../services/form-service.service';

@Component({
  selector: 'app-formIndexTable',
  templateUrl: './index-table.component.html'
})
export class FormIndexTableComponent {
  @ViewChild('table') table: Table;

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
    let sortField = event.sortField;
    let sortOrder = event.sortOrder;
    this.loading = true;

    const queryParams = {
      page: (first / rows) + 1,
      pageSize: rows,
    }

    this.formService.index(queryParams).subscribe({
      next: (res) => {
        if (res.ok) {
          this.forms = res.body.payload.data;
          this.totalRecords = res.body.payload.total;
        }
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
