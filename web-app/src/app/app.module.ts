import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { ChipModule } from 'primeng/chip';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { DialogService } from 'primeng/dynamicdialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MenuModule } from 'primeng/menu';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { PaginatorModule } from 'primeng/paginator';
import { EditorModule } from 'primeng/editor';
import { InputSwitchModule } from 'primeng/inputswitch';
import { DialogModule } from 'primeng/dialog';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './core/components/footer/footer.component';
import { MainComponent } from './core/components/main/main.component';
import { NotfoundComponent } from './core/components/notfound/notfound.component';
import { AuthComponent } from './features/auth/auth.component';
import { LoginComponent } from './features/auth/components/login/login.component';
import { FormEditorControlListComponent } from './features/form-editor/components/form-editor-control-list/form-control-list.component';
import { FormEditorControlComponent } from './features/form-editor/components/form-editor-control/form-control.component';
import { FormEditorComponent } from './features/form-editor/form-editor.component';
import { FormResponseReviewComponent } from './features/form-response/components/form-review/form-show.component';
import { FormResponseIndexTableComponent } from './features/form-response/components/index-table/index-table.component';
import { FormResponseComponent } from './features/form-response/form-response.component';
import { FormNewComponent } from './features/form/components/form-new/form-new.component';
import { FormUpdateComponent } from './features/form/components/form-update/form-update.component';
import { FormIndexTableComponent } from './features/form/components/index-table/index-table.component';
import { FormIndexTableMenuComponent } from './features/form/components/table-menu/table-menu.component';
import { FormComponent } from './features/form/form.component';
import { FormControlComponent } from './shared/components/form-controls/form-control.component';
import { FormDateComponent } from './shared/components/form-controls/form-date.component';
import { FormMultipleComponent } from './shared/components/form-controls/form-multiple.component';
import { FormNumberComponent } from './shared/components/form-controls/form-number.component';
import { FormSingleComponent } from './shared/components/form-controls/form-single.component';
import { FormTextComponent } from './shared/components/form-controls/form-text.component';
import { FormViewComponent } from './features/form-view/form-view.component';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { MenubarModule } from 'primeng/menubar';
import { TopbarComponent } from './core/components/topbar/topbar.component';
import { MenuService } from './core/components/menu/menu.service';
import { MenuComponent } from './core/components/menu/menu.component';
import { MenuItemComponent } from './core/components/menuitem/menuitem.component';
import { FormShareComponent } from './shared/components/form-share/form-share.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
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
    CardModule,
    DropdownModule,
    CheckboxModule,
    ToolbarModule,
    RadioButtonModule,
    InputTextModule,
    InputNumberModule,
    CalendarModule,
    PaginatorModule,
    MenubarModule,
    InputTextareaModule,
    EditorModule,
    InputSwitchModule,
    DialogModule
  ],
  declarations: [
    AppComponent,
    TopbarComponent,
    FooterComponent,
    MainComponent,
    MenuComponent,
    MenuItemComponent,
    NotfoundComponent,

    AuthComponent,
    LoginComponent,

    FormComponent,
    FormIndexTableComponent,
    FormIndexTableMenuComponent,
    FormUpdateComponent,
    FormNewComponent,
    FormEditorComponent,
    FormEditorControlComponent,
    FormEditorControlListComponent,

    FormResponseComponent,
    FormResponseIndexTableComponent,
    FormResponseReviewComponent,

    FormTextComponent,
    FormNumberComponent,
    FormDateComponent,
    FormSingleComponent,
    FormMultipleComponent,
    FormControlComponent,
    FormViewComponent,
    FormShareComponent
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    MessageService,
    ConfirmationService,
    DialogService,
    MenuService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
