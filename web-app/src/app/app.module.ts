import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { ChipModule } from 'primeng/chip';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogService } from 'primeng/dynamicdialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccesdeniedComponent } from './core/components/accesdenied/accesdenied.component';
import { BreadcrumbComponent } from './core/components/breadcrumb/breadcrumb.component';
import { ErrorComponent } from './core/components/error/error.component';
import { FooterComponent } from './core/components/footer/footer.component';
import { MainComponent } from './core/components/main/main.component';
import { MenuComponent } from './core/components/menu/menu.component';
import { MenuItemComponent } from './core/components/menuitem/menuitem.component';
import { NotfoundComponent } from './core/components/notfound/notfound.component';
import { TopbarComponent } from './core/components/topbar/topbar.component';
import { AuthComponent } from './features/auth/auth.component';
import { LoginComponent } from './features/auth/components/login/login.component';
import { SignupComponent } from './features/auth/components/signup/signup.component';
import { FormEditorComponent } from './features/form-editor/form-editor.component';
import { FormIndexTableComponent } from './features/form/components/index-table/index-table.component';
import { FormComponent } from './features/form/form.component';
import { FormIndexTableMenuComponent } from './features/form/components/table-menu/table-menu.component';
import { MenuModule } from 'primeng/menu';
import { FormUpdateComponent } from './features/form/components/form-update/form-update.component';
import { FormNewComponent } from './features/form/components/form-new/form-new.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    ToastModule,
    ConfirmDialogModule,
    AvatarModule,
    QuillModule,

    TableModule,
    ProgressSpinnerModule,
    ChipModule,
    MenuModule,
  ],
  declarations: [
    AppComponent,
    BreadcrumbComponent,
    FooterComponent,
    MainComponent,
    MenuComponent,
    MenuItemComponent,
    TopbarComponent,
    AccesdeniedComponent,
    ErrorComponent,
    NotfoundComponent,

    AuthComponent,
    LoginComponent,
    SignupComponent,

    FormComponent,
    FormIndexTableComponent,
    FormIndexTableMenuComponent,
    FormUpdateComponent,
    FormNewComponent,
    FormEditorComponent,
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    MessageService,
    ConfirmationService,
    DialogService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
