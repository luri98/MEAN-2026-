import { CanActivateFn, RedirectCommand, Router } from '@angular/router'
import { inject } from '@angular/core'
import { AuthService } from '../services/auth'

export const guestGuard: CanActivateFn = () => {
  const auth = inject(AuthService)
  const router = inject(Router)

  if (auth.isLoggedIn()) {
    const homeUrl = router.parseUrl('/');
    return new RedirectCommand(homeUrl);
  }

  return true
}