import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthenticationService } from '../../../../core/services/authentication.service';

@Component({
  selector: 'app-logIn',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {

  formDetails: FormGroup;

  constructor(
    private authSvc: AuthenticationService,
    private msgSvc: MessageService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.formDetails = this.formBuilder.group({
      "password": [null, [Validators.required]],
      "username": [null, [Validators.required]]
    }, {
      updateOn: 'change'
    })
  }

  get username(): AbstractControl {
    return this.formDetails.get('username')
  }

  get password(): AbstractControl {
    return this.formDetails.get('password')
  }

  logIn() {
    if (!this.formDetails.valid) {
      this.msgSvc.add({
        severity: 'warn',
        detail: 'Complete correctamente todos los campos',
      })
      return;
    }

    this.authSvc.logIn(this.formDetails.value).subscribe({
      next: res => {
        if (res) {
          this.router.navigate(['']);
        } else {
          this.msgSvc.add({
            severity: 'error',
            summary: 'No se pudo iniciar sesión',
          });
        }
      }
    });
  }
}
