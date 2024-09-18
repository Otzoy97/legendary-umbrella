import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormItem } from '../../interfaces/form-item.interface';

@Component({
  selector: 'app-formControl',
  templateUrl: './form-control.component.html',
})
export class FormControlComponent {
  @Input() formItem!: FormItem;
  @Input() control!: FormControl;

  get type(): string {
    return this.formItem.type;
  }
}
