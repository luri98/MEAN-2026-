import { Routes } from '@angular/router'
import { AdminLayout } from './layouts/admin-layout'

export const adminRoutes: Routes = [
    {
        path: '',
        component: AdminLayout,
        children: [
            {
                path: '',
                redirectTo: 'korisnici',
                pathMatch: 'full'
            },
            {
                path: 'korisnici',
                loadComponent: () => import('./pages/users/users').then(m => m.Users)
            },
            {
                path: 'kategorije',
                loadComponent: () => import('./pages/categories/categories').then(m => m.Categories)
            },
            {
                path: 'proizvodi',
                loadComponent: () => import('./pages/products/products').then(m => m.Products)
            },
            {
                path: 'porudzbine',
                loadComponent: () => import('./pages/orders/orders').then(m => m.Orders)
            },
        ]
    }
]