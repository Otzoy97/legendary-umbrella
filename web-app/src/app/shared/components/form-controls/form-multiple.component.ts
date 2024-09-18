import { Component, Input } from '@angular/core';
import { ControlContainer, FormControl, FormGroupDirective } from '@angular/forms';
import { FormItem } from '../../interfaces/form-item.interface';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-formMultiple',
  template: `
  <div class="grid p-fluid">
    <div class="col">
      <ng-container *ngFor="let element of elements">
        <div class="field-checkbox">
          <p-checkbox [formControl]="control" [value]="element.value" [inputId]="element.value"></p-checkbox>
          <label [for]="element.value">{{element.label}}</label>
        </div>
      </ng-container>
      <small class="text-pink-500" *ngIf="control.hasError('required')">* This field is mandatory</small>
    </div>
  </div>
  `,
  viewProviders: [{
    provide: ControlContainer,
    useExisting: FormGroupDirective
  }]
})
export class FormMultipleComponent {
  @Input() formItem!: FormItem;
  @Input() control!: FormControl;

  elements: SelectItem[] = [];

  ngOnInit(): void {
    const optionsString = this.formItem.options;
    optionsString.trim().split('\n').forEach(e => {
      this.elements.push({ label: e, value: e });
    })
  }
}
