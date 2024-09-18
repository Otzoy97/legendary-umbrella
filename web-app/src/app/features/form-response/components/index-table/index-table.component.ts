import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { TableLazyLoadEvent } from 'primeng/table';
import { TableColumn } from '../../../../shared/interfaces/table-column';
import { FormResponseService } from '../../services/form-response.service';
import { PaginatorState } from 'primeng/paginator';

@Component({
  selector: 'app-formResponseIndexTable',
  templateUrl: './index-table.component.html',
})
export class FormResponseIndexTableComponent implements OnInit {

  @Input() formId!: string;
  public loading: boolean = true;
  public totalRecords: number = 0;
  public forms: any[] = [];
  

  constructor(
    private readonly formResponseService: FormResponseService,
    private readonly messageService: MessageService,
    private readonly router: Router,
  ) { }

  ngOnInit(): void {
    this.onPageChange({ first: 0, rows: 1 });
  }

  onPageChange(event: PaginatorState) {
    let rows = event.rows;
    let first = event.first;
    this.loading = true;

    const queryParams = {
      page: (first / rows) + 1,
      page_size: rows,
      form_id: this.formId
    }

    this.formResponseService.index(queryParams).subscribe({
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

  view(formResponse: any) {
    this.router.navigate(['forms', formResponse.id, 'response']);
  }

}
