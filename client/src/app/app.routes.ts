import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./layouts/default-layout/default-layout').then(m => m.DefaultLayout),
        children: [
            { path: '',  loadComponent: () => import('./pages/home/home').then(m => m.Home) },
            { path: 'kontakt',  loadComponent: () => import('./pages/contact/contact').then(m => m.Contact) },
            { path: 'proizvodi',  loadComponent: () => import('./pages/products/products').then(m => m.Products) },
        ]
    }
];
