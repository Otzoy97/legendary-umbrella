import { Component, Input } from '@angular/core';
import { ControlContainer, FormGroupDirective, FormControl } from '@angular/forms';
import { FormItem } from '../../interfaces/form-item.interface';

@Component({
  selector: 'app-formNumber',
  template: `
  <div class="grid p-fluid">
    <div class="col">
      <div class="field">
        <p-inputNumber 
        [formControl]="control" 
        mode="decimal" 
        [minFractionDigits]="0"
        [maxFractionDigits]="5"
        ></p-inputNumber>
      </div>
      <small class="text-pink-500" *ngIf="control.hasError('required')">* This field is mandatory</small>
    </div>
  </div>
  `,
  viewProviders: [{
    provide: ControlContainer,
    useExisting: FormGroupDirective
  }]
})
export class FormNumberComponent {
  @Input() formItem!: FormItem;
  @Input() control!: FormControl;
}
