import { Component } from '@angular/core'
import { AdminSidebar } from '../../../layout/admin/sidebar/sidebar';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-default-layout',
  imports: [RouterOutlet, AdminSidebar],
  template: `<div class="min-h-screen flex flex-col">
                <app-admin-sidebar />
                <div class="flex-1 flex flex-col lg:pl-64">
                  <router-outlet />
                </div>
              </div>`
})
export class AdminLayout { }