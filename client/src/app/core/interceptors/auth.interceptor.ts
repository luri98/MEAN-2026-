import { isPlatformBrowser } from '@angular/common'
import { HttpInterceptorFn } from '@angular/common/http'
import { inject, PLATFORM_ID } from '@angular/core'
import { Router } from '@angular/router'
import { catchError, throwError } from 'rxjs'

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const router = inject(Router)
    const storedUser = localStorage.getItem('auth_user')

    if (!storedUser) {
        return next(req)
    }

    const user = JSON.parse(storedUser)
    const token = user?.token

    if (!token) {
        return next(req)
    }

    const authReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
    })

    return next(authReq).pipe(
        catchError(error => {
            if (error.status === 401 && isPlatformBrowser(PLATFORM_ID)) {
                localStorage.removeItem('auth_user')
                router.navigate(['/prijava'])
            }

            return throwError(() => error)
        })
    )
}