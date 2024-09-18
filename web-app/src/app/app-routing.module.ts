import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MainComponent } from './core/components/main/main.component';
import { NotfoundComponent } from './core/components/notfound/notfound.component';
import { canActivateLoginGuard, canActivateLogoutGuard } from './core/guards/can-activate-routes.guard';
import { AuthComponent } from './features/auth/auth.component';
import { LoginComponent } from './features/auth/components/login/login.component';
import { FormEditorComponent } from './features/form-editor/form-editor.component';
import { FormResponseComponent } from './features/form-response/form-response.component';
import { FormComponent } from './features/form/form.component';
import { FormViewComponent } from './features/form-view/form-view.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: '', component: MainComponent,
        children: [
          { path: '', redirectTo: 'forms', pathMatch: 'full' },
          { path: 'forms', component: FormComponent, canActivate: [canActivateLoginGuard] },
          { path: 'forms/:id/editor', component: FormEditorComponent, canActivate: [canActivateLoginGuard] },
          { path: 'forms/:id/responses', component: FormResponseComponent, canActivate: [canActivateLoginGuard] },
          { path: 'forms/:id/view', component: FormViewComponent } // form id
        ],
      },
      { path: 'notfound', component: NotfoundComponent },
      {
        path: 'auth', component: AuthComponent,
        children: [
          { path: 'login', component: LoginComponent },
        ],
        canActivateChild: [canActivateLogoutGuard]
      },
      { path: '**', redirectTo: '/notfound' }
    ], { scrollPositionRestoration: 'enabled' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }