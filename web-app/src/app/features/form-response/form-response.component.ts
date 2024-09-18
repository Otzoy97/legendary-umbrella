import { Component, OnInit } from '@angular/core';
import { FormService } from '../form/services/form.service';
import { Form } from '../../shared/interfaces/form.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-formResponse',
  templateUrl: './form-response.component.html',
})
export class FormResponseComponent implements OnInit {

  public form: Form;
  public loadingPage: boolean = true;

  constructor(
    private readonly formService: FormService,
    private readonly messageService: MessageService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    const formId = this.route.snapshot.paramMap.get('id');
    this.formService.show(formId).subscribe({
      next: (res) => {
        this.form = res.payload;
        this.loadingPage = false;
      }, error: (err) => {
        this.messageService.add({
          severity: 'error',
          detail: err.error.message || 'An error occurred while loading the form'
        });
      }
    });
  }

  exit(): void {
    this.router.navigate(['forms']);
  }
}
