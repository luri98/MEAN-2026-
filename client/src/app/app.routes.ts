import { Routes } from '@angular/router';
import { guestGuard } from './core/guards/guest-guard';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./layouts/default-layout/default-layout').then(m => m.DefaultLayout),
        children: [
            {
                path: '',
                loadComponent: () => import('./pages/home/home').then(m => m.Home)
            },
            {
                path: 'prijava',
                canActivate: [guestGuard],
                loadComponent: () => import('./pages/login/login').then(m => m.Login)
            },
            {
                path: 'registracija',
                loadComponent: () => import('./pages/registration/registration').then(m => m.Registration),
            },
            {
                path: 'zaboravljena-lozinka',
                loadComponent: () => import('./pages/forgotten-password/forgotten-password').then(m => m.ForgottenPassword),
            },
            {
                path: 'reset-lozinke/:token',
                loadComponent: () => import('./pages/reset-password/reset-password').then(m => m.ResetPassword),
            },
            {
                path: 'kontakt',
                loadComponent: () => import('./pages/contact/contact').then(m => m.Contact)
            },
            {
                path: 'proizvodi',
                loadComponent: () => import('./pages/products/products').then(m => m.Products)
            },
            {
                path: 'profil',
                canActivate: [authGuard],
                loadComponent: () => import('./pages/profile/profile').then(m => m.Profile)
            },
        ]
    }
];
