import { Component } from '@angular/core';
import { MainComponent } from '../main/main.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
})
export class TopbarComponent {

  public avatarLabel: string = "0";
  public profileRouterLink: string = "usuario/perfil";

  constructor(
    public app: MainComponent,
    //private authSvc: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    /*this.authSvc.profile().subscribe({
      next: res => {
        if (res) {
          this.avatarLabel = res.payload.nombre.substring(0, 1);
        }
      }
    });*/
  }

  logout() {
    /*this.authSvc.logOut().subscribe({
      next: _ => {
        this.router.navigate(['auth/login']);
      }, error: _ => {
        this.router.navigate(['auth/login']);
      }
    });*/

  }
}
