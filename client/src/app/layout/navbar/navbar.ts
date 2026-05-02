import { Component, computed, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { AuthService } from '../../core/services/auth';
import { ProfileMenu } from '../../shared/components/profile-menu/profile-menu';
import { Route } from '../../models/route.model';


@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, ProfileMenu],
  templateUrl: './navbar.html',
})

export class Navbar {
  private auth = inject(AuthService)
  private router = inject(Router)
  private sanitizer = inject(DomSanitizer)

  isVisible = false

  user = this.auth.getUser()

  routes = computed<Route[]>(() => {
    const user = this.user()

    const routes: Route[] = [
      {
        name: 'Početna',
        href: '/',
        svg: `
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
              stroke-width="1.5" stroke="currentColor" class="size-5">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
          `
      },
      {
        name: 'Proizvodi',
        href: '/proizvodi',
        svg: `
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
              stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
          `
      },
      // {
      //   name: 'Kontakt',
      //   href: '/kontakt',
      //   svg: `
      //       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
      //         stroke-width="1.5" stroke="currentColor" class="size-6">
      //         <path stroke-linecap="round" stroke-linejoin="round"
      //           d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
      //       </svg>
      //     `
      // }
    ]

    if (user) {
      routes.unshift(
        {
          name: 'Profil',
          href: '/profil',
          authRequired: true,
          svg: `
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>
            `,
        },
        {
          name: 'Porudžbine',
          href: '/moje-porudzbine',
          authRequired: true,
          svg: `
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0-3.75-3.75M17.25 21 21 17.25" />
              </svg>
            `
        }
      )
    }

    if (user?.role === 'admin') {
      routes.unshift({
        name: 'Admin Panel',
        href: '/admin',
        authRequired: true,
        svg: `
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25" />
              </svg>
            `
        
      })
    }

    return routes
  })


  sanitizeSvg(svg: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(svg)
  }

  toggleMenu() {
    this.isVisible = !this.isVisible;
  }

  logout() {
    this.isVisible = false
    setTimeout(() => {  
      this.auth.clear()
      this.router.navigate(['/prijava'])
    }, 300)
  } 

}
