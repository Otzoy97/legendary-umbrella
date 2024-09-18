import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormItemService } from '../../services/form-item.service';
import { debounceTime, Subscription, switchMap } from 'rxjs';
import { MessageService, SelectItem } from 'primeng/api';

export enum ItemType {
  TEXT = 'text',
  NUMBER = 'number',
  DATE = 'date',
  MULTIPLE = 'multiple',
  SINGLE = 'single'
}

@Component({
  selector: 'app-formControlEditor',
  templateUrl: './form-control.component.html',
})
export class FormEditorControlComponent implements OnInit, OnDestroy {

  @Input() public formItem: any;
  public modules: any;
  public formGroup: FormGroup;
  public itemTypes: SelectItem<ItemType>[];
  private subs: Subscription = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private formItemService: FormItemService,
    private messageService: MessageService,
  ) {
    this.modules = {
      toolbar: [
        ['bold', 'italic', 'underline', 'strike'],
        ['clean'],
      ]
    };
    this.itemTypes = [
      { label: 'Text', value: ItemType.TEXT },
      { label: 'Number', value: ItemType.NUMBER },
      { label: 'Date', value: ItemType.DATE },
      { label: 'Checkbox', value: ItemType.MULTIPLE },
      { label: 'Radio', value: ItemType.SINGLE }
    ]
  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      name: this.formItem.name || '',
      required: this.formItem.required || false,
      type: this.formItem.type || ItemType.TEXT,
      options: this.formItem.options || '',
    });

    this.subs.add(
      this.formGroup.valueChanges.pipe(
        debounceTime(500),
        switchMap(async (itemData) => {
          this.saveItem(itemData);
        })
      ).subscribe()
    );

    this.subs.add(
      this.formGroup.get('type')?.valueChanges.subscribe((type) => {
        const optionsControl = this.formGroup.get('options');

        if (type === 'single' || type === 'multiple') {
          optionsControl?.setValidators([Validators.required]);
        } else {
          optionsControl?.clearValidators();
        }

        optionsControl?.updateValueAndValidity();
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  get itemType(): ItemType {
    return this.formGroup.get('type').value;
  }

  private saveItem(data: any) {
    this.subs.add(
      this.formItemService.update(this.formItem.id, data).subscribe({
        next: (res) => {
          this.formItem = res.payload;
          this.messageService.add({
            severity: 'success',
            detail: 'Form saved'})
        }, error: (err) => {
          this.messageService.add({
            severity: 'error',
            detail: err.error.message || 'Error updating item'
          });
        }
      })
    );
  }
}
