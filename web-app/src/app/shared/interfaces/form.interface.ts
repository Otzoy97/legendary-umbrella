import { User } from "./user.interface";

export interface Form {
  id: number;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: User;
  updatedBy: User;
}

export interface FormCreate {
  name: string;
  description?: string;
}