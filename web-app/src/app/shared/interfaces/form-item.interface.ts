import { Form } from "./form.interface";

export interface FormItem {
  id: number;
  name: string;
  required: boolean;
  type: string;
  options?: string;
  form?: Form;
  order: number;
}