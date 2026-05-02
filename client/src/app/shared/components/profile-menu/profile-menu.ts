import { Component, inject, input } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { User } from '../../../models/user.model';
import { Route } from '../../../models/route.model';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'app-profile-menu',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <div class="relative flex flex-col">
      <button class="flex items-center gap-6 p-1 bg-gray-800 px-2 py-1 rounded-lg cursor-pointer" (click)="toggle()">
        <div class="flex flex-col text-left w-40">
          <div class="text-sm font-medium truncate">{{ user()?.name }}</div>
          <div class="text-xs truncate">{{ user()?.email }}</div>
        </div>
        <svg
          class="size-6 transition-all shrink-0"
          [class]="isVisible ? 'rotate-180' : 'rotate-0'"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor">
          <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.94a.75.75 0 111.08 1.04l-4.24 4.5a.75.75 0 01-1.08 0l-4.24-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
        </svg>
      </button>
      <div class="absolute top-[130%] right-0 z-50 flex flex-col w-55  bg-white shadow border border-gray-300/80 transition-all scale-95 rounded-lg" 
        [class]="isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'">
         <div class="flex flex-col">
            @for (route of routes().filter((r) => r.authRequired); track route.href) {
                <a  #rla="routerLinkActive"
                    class="flex items-center justify-between p-2 font-medium text-gray-900 border-gray-300 border-b hover:bg-gray-100 transition-all"
                    [class]="$index === 0 ? 'rounded-t-lg' : ''"
                    [routerLink]="route.href" 
                    routerLinkActive
                    [routerLinkActiveOptions]="{ exact: route.href === '/' }">
                    <div class="flex items-center space-x-2">
                        <span [innerHTML]="sanitizeSvg(route.svg)"></span>
                        <span class="text-xs uppercase">{{ route.name }}</span>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                </a>
            }
            <a class="flex items-center justify-between p-2 hover:bg-gray-100 transition-all rounded-b-lg cursor-pointer" (click)="logout()">
                <div class="flex items-center space-x-2 font-medium text-gray-900 border-gray-300">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
                    </svg>
                    <span class="text-xs uppercase">Odjava</span>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
            </a>
        </div>
      </div>
    </div>`,
  styles: [`
      .menu.open {
        opacity: 1;
        transform: scale(1);
      }

      .arrow.open {
        transform: rotate(180deg);
      }
  `]
})

export class ProfileMenu {
  user = input.required<User | null>();
  routes = input.required<Route[]>();

  private auth = inject(AuthService)
  private router = inject(Router)
  private sanitizer = inject(DomSanitizer)
  isVisible = false;

  toggle() {
    this.isVisible = !this.isVisible;
  }

  sanitizeSvg(svg: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(svg)
  }

  logout() {
    this.auth.clear()
    this.isVisible = false
    this.router.navigate(['/prijava'])
  }
}