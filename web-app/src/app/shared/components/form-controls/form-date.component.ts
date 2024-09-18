import { Component, Input } from '@angular/core';
import { ControlContainer, FormControl, FormGroupDirective } from '@angular/forms';
import { FormItem } from '../../interfaces/form-item.interface';

@Component({
  selector: 'app-formDate',
  template: `
  <div class="grid p-fluid">
    <div class="col">
      <div class="field">
        <p-calendar [formControl]="control"></p-calendar>
      </div>
      <small class="text-pink-500" *ngIf="control.hasError('required')">* This field is mandatory</small>
    </div>
  </div>`,
  viewProviders: [{
    provide: ControlContainer,
    useExisting: FormGroupDirective
  }]
})
export class FormDateComponent {
  @Input() formItem!: FormItem;
  @Input() control!: FormControl;
}
