import { Component } from '@angular/core'
import { AdminSidebar } from '../components/sidebar/sidebar';
import { RouterOutlet } from '@angular/router';
import { AdminHeader } from '../components/header/header';

@Component({
  selector: 'app-default-layout',
  imports: [RouterOutlet, AdminSidebar, AdminHeader],
  template: `<div class="min-h-screen flex flex-col">
                <app-admin-sidebar />
                <div class="flex-1 flex flex-col lg:pl-64">
                  <app-admin-header/>
                  <router-outlet />
                </div>
              </div>`
})
export class AdminLayout { }