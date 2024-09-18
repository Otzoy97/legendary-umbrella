import { Component, Input } from '@angular/core';
import { ControlContainer, FormControl, FormGroupDirective } from '@angular/forms';
import { FormItem } from '../../interfaces/form-item.interface';

@Component({
  selector: 'app-formText',
  template: `
  <div class="grid p-fluid">
    <div class="col">
      <div class="field">
        <input type="text" pInputText [formControl]="control" />
      </div>
      <small class="text-pink-500" *ngIf="control.hasError('required')">* This field is mandatory</small>
    </div>
  </div>`,
  viewProviders: [{
    provide: ControlContainer,
    useExisting: FormGroupDirective
  }]
})
export class FormTextComponent {
  @Input() formItem!: FormItem;
  @Input() control!: FormControl;
}
