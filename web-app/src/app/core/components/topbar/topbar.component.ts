import { Component } from '@angular/core';
import { MainComponent } from '../main/main.component';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../features/auth/services/authentication.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
})
export class TopbarComponent {

  constructor(
    public app: MainComponent,
    private authSvc: AuthenticationService,
    private router: Router
  ) { }


  logout() {
    this.authSvc.logOut();
    this.router.navigate(['/auth/login']);
  }
}
