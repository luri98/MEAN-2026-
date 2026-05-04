// src/app/guards/admin.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router, RedirectCommand } from '@angular/router';
import { AuthService } from '../services/auth';

export const adminGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isAdmin()) {
    return true;
  }

  // Redirect non-admins to home
  const homeUrl = router.parseUrl('/');
  return new RedirectCommand(homeUrl);
};