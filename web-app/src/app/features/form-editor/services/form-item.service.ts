import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { FormItem } from '../../../shared/interfaces/form-item.interface';
import { Response } from '../../../shared/interfaces/response.interface';

@Injectable({
  providedIn: 'root'
})
export class FormItemService {

  private apiUrl = environment.url + '/form-item';

  constructor(private readonly http: HttpClient) { }

  index(idForm: string): Observable<Response<FormItem[]>> {
    return this.http.get<Response<FormItem[]>>(`${this.apiUrl}/${idForm}`);
  }

  create(idForm: string, data: any): Observable<Response<FormItem>> {
    return this.http.post<Response<FormItem>>(`${this.apiUrl}/${idForm}`, data);
  }

  show(id: number): Observable<Response<FormItem>> {
    return this.http.get<Response<FormItem>>(`${this.apiUrl}/${id}`);
  }

  update(id: number, data: any): Observable<Response<FormItem>> {
    return this.http.patch<Response<FormItem>>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<Response<void>> {
    return this.http.delete<Response<void>>(`${this.apiUrl}/${id}`);
  }
}
