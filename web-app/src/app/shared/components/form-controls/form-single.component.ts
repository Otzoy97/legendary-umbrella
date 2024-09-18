import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer, FormControl, FormGroupDirective } from '@angular/forms';
import { FormItem } from '../../interfaces/form-item.interface';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-formSingle',
  template: `
  <div class="grid p-fluid">
    <div class="col">
      <div class="field-checkbox" *ngFor="let element of elements">
        <p-radioButton [inputId]="element.value" name="g1" [value]="element.value" [formControl]="control"></p-radioButton>
        <label [for]="element.value">{{element.label}}</label>
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
export class FormSingleComponent implements OnInit {
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
