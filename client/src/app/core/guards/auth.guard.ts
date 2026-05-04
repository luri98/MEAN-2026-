// src/app/guards/auth.guard.ts
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router, RedirectCommand } from '@angular/router';
import { AuthService } from '../services/auth';
import { isPlatformBrowser } from '@angular/common';

export const authGuard: CanActivateFn = (route, state) => {
  const platformId = inject(PLATFORM_ID);

  // ✅ skip guard on server, let client handle it
  if (!isPlatformBrowser(platformId)) return true;

  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isLoggedIn()) {
    return true;
  }

  const loginUrl = router.parseUrl('/prijava');
  return new RedirectCommand(loginUrl, {
    skipLocationChange: false,
    info: { returnUrl: state.url }
  });
};