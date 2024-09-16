import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  private apiUrl = environment.url + '/form';

  constructor(private readonly http: HttpClient) { }

  index(params: any): Observable<HttpResponse<any>> {
    return this.http.get(`${this.apiUrl}`, { params, observe: 'response' });
  }

  create(data: any): Observable<HttpResponse<any>> {
    return this.http.post(`${this.apiUrl}`, data, { observe: 'response' });
  }

  show(id: string): Observable<HttpResponse<any>> {
    return this.http.get(`${this.apiUrl}/${id}`, { observe: 'response' });
  }

  update(id: string, data: any): Observable<HttpResponse<any>> {
    return this.http.patch(`${this.apiUrl}/${id}`, data, { observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<any>> {
    return this.http.delete(`${this.apiUrl}/${id}`, { observe: 'response' });
  }
}
