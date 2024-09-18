import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { AuthenticationService } from '../../features/auth/services/authentication.service';
import { MessageService } from 'primeng/api';

export const canActivateLoginGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router = inject(Router);
  const isLogged = inject(AuthenticationService).isLogged();
  const messageService = inject(MessageService);
  if (!isLogged) {
    messageService.add({
      severity: 'warn',
      detail: 'You must be logged in to access this page'
    })
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