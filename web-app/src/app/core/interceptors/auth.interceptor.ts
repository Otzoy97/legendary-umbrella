import {
  HttpBackend,
  HttpClient,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private token_key = environment.token_key;

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const tkn = localStorage.getItem(this.token_key);

    if (tkn) {
      const clonedRequest = request.clone({
        headers: request.headers.append('Authorization', `Bearer ${tkn}`)
      });
      return next.handle(clonedRequest);
    }
    return next.handle(request);
  }


}
