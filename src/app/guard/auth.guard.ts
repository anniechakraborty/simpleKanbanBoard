import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthServiceService } from '../service/auth-service.service';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthServiceService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true; // Allow access if authenticated
  } else {
    router.navigateByUrl('/login'); // Redirect unauthorized users
    return false;
  }
};
