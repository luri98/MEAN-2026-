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
        ]
    }
]