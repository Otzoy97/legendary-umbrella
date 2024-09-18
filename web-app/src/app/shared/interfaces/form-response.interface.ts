import { FormItem } from "./form-item.interface";
import { Form } from "./form.interface";

export interface FormResponse {
  id: number;
  form: Form;
  responseItems: FormResponseItem[];
  createdAt: Date;
}

export interface FormResponseItem {
  value: any;
  formResponse?: FormResponse;
  item?: FormItem
}

export interface FormResponseCreate {
  items: FormResponseItemCreate[];
}

export interface FormResponseItemCreate {
  id: number;
  value: string;
}