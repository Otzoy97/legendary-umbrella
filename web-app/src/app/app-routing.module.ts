import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MainComponent } from './core/components/main/main.component';
import { AuthComponent } from './features/auth/auth.component';
import { LoginComponent } from './features/auth/components/login/login.component';
import { SignupComponent } from './features/auth/components/signup/signup.component';
import { canActivateLoginGuard, canActivateLogoutGuard } from './core/guards/can-activate-routes.guard';
import { ErrorComponent } from './core/components/error/error.component';
import { AccesdeniedComponent } from './core/components/accesdenied/accesdenied.component';
import { NotfoundComponent } from './core/components/notfound/notfound.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: '', component: MainComponent,
        children: [

        ],
        canActivateChild: [canActivateLoginGuard]
      },
      { path: 'error', component: ErrorComponent },
      { path: 'access', component: AccesdeniedComponent },
      { path: 'notfound', component: NotfoundComponent },
      {
        path: 'auth', component: AuthComponent,
        children: [
          { path: 'login', component: LoginComponent },
          { path: 'signup', component: SignupComponent }
        ],
        canActivateChild: [canActivateLogoutGuard]
      }
    ], { scrollPositionRestoration: 'enabled' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }