import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaginatedResponse, Response } from '../../../shared/interfaces/response.interface';
import { Form, FormCreate } from '../../../shared/interfaces/form.interface';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  private apiUrl = environment.url + '/form';

  constructor(private readonly http: HttpClient) { }

  index(params: any): Observable<PaginatedResponse<Form>> {
    return this.http.get<PaginatedResponse<Form>>(`${this.apiUrl}`, { params });
  }

  create(data: FormCreate): Observable<Response<Form>> {
    return this.http.post<Response<Form>>(`${this.apiUrl}`, data);
  }

  show(id: string): Observable<Response<Form>> {
    return this.http.get<Response<Form>>(`${this.apiUrl}/${id}`);
  }

  update(id: string, data: any): Observable<Response<void>> {
    return this.http.patch<Response<void>>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: string): Observable<Response<void>> {
    return this.http.delete<Response<void>>(`${this.apiUrl}/${id}`);
  }
}
