import { HttpInterceptorFn } from '@angular/common/http'

export const authInterceptor: HttpInterceptorFn = (req, next) => {
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

    return next(authReq)
}