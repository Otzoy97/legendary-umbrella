import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

export const canActivateLoginGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router = inject(Router);
  const isLogged = inject(AuthenticationService).isLogged();
  if (!isLogged) {
    router.navigate(['auth/login']);
  }
  return isLogged;
}

export const canActivateLogoutGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router = inject(Router);
  const isLogged = inject(AuthenticationService).isLogged();
  if (isLogged) {
    router.navigate(['']);
  }
  return !isLogged;
}