import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { FormResponse, FormResponseCreate } from '../../../shared/interfaces/form-response.interface';
import { PaginatedResponse, Response } from '../../../shared/interfaces/response.interface';

@Injectable({
  providedIn: 'root'
})
export class FormResponseService {

  private apiUrl = environment.url + '/form-response';

  constructor(private readonly http: HttpClient) { }

  /**
   * Retrieves paginated form responses
   * @param params Query parameters
   * @returns 
   */
  index(params: any): Observable<PaginatedResponse<FormResponse>> {
    return this.http.get<PaginatedResponse<FormResponse>>(`${this.apiUrl}`, { params });
  }

  /**
   * Retrieves a form response by its id
   * @param id Form response id
   * @returns 
   */
  show(id: string): Observable<Response<FormResponse>> {
    return this.http.get<Response<FormResponse>>(`${this.apiUrl}/${id}`);
  }

  /**
   * Creates a new form response
   * @param id Form id
   * @param payload Data to create a new form response
   * @returns 
   */
  create(id: string, payload: FormResponseCreate): Observable<Response<void>> {
    return this.http.post<Response<void>>(`${this.apiUrl}/${id}`, payload);
  }
}
