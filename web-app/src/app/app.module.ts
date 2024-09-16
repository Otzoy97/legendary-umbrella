import { NgModule } from '@angular/core';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { AppComponent } from './app.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
    ToastModule,
    ConfirmDialogModule,
  ],
  declarations: [AppComponent],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    MessageService,
    ConfirmationService,
    DialogService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
