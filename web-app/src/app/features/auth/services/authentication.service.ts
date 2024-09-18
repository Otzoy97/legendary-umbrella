import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private apiUrl = environment.url;
  private tokenKey = environment.token_key;

  constructor(private readonly http: HttpClient) { }

  public logIn(credentials: any): Observable<boolean> {
    return this.http.post(`${this.apiUrl}/auth/login`, credentials).pipe(
      map((res: any) => {
        localStorage.setItem(this.tokenKey, res.payload.access_token);
        return true;
      }),
      catchError(() => {
        return of(false);
      })
    )
  }

  public signUp(credentials: any): Observable<boolean> {
    return this.http.post(`${this.apiUrl}/user`, credentials).pipe(
      map((res: any) => {
        localStorage.setItem(this.tokenKey, res.payload.access_token);
        return true;
      }),
      catchError(() => {
        return of(false);
      })
    )
  }

  public logOut(): void {
    localStorage.removeItem(this.tokenKey);
  }

  public isLogged(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }
}
