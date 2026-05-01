import { Routes } from '@angular/router';
import { guestGuard } from './core/guards/guest-guard';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./layouts/default-layout/default-layout').then(m => m.DefaultLayout),
        children: [
            { path: '',  loadComponent: () => import('./pages/home/home').then(m => m.Home) },
            { path: 'prijava',  loadComponent: () => import('./pages/login/login').then(m => m.Login), canActivate: [guestGuard] },
            { path: 'registracija',  loadComponent: () => import('./pages/registration/registration').then(m => m.Registration), },
            { path: 'kontakt',  loadComponent: () => import('./pages/contact/contact').then(m => m.Contact) },
            { path: 'proizvodi',  loadComponent: () => import('./pages/products/products').then(m => m.Products) },
        ]
    }
];
