import { Component, inject, signal } from "@angular/core";
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from "@angular/router";
import { Spinner } from "../../../shared/components/spinner/spinner";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { AuthService } from "../../../core/services/auth";
import { Route } from "../../../models/route.model";
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map, startWith } from "rxjs";

@Component({
    selector: 'app-admin-sidebar',
    standalone: true,
    imports: [RouterLink, RouterLinkActive, Spinner],
    templateUrl: './sidebar.html',
})

export class AdminSidebar {
    private router = inject(Router)
    private sanitizer = inject(DomSanitizer)
    private auth = inject(AuthService)

    showMobileDrawer = signal(false)
    loading = signal(true)

    sectionName = toSignal(
        this.router.events.pipe(
            filter(e => e instanceof NavigationEnd),
            startWith(null),
            map(() => {
                const routeName = this.router.url.split('/')[2];
                switch (routeName) {
                    case 'korisnici': return 'Korisnici';
                    case 'kategorije': return 'Kategorije';
                    case 'proizvodi': return 'Proizvodi';
                    case 'porudzbine': return 'Porudžbine';
                    default: return 'Error';
                }
            })
        )
    );

    routes: Route[] = [
        {
            name: 'Korisnici',
            href: '/admin/korisnici',
            svg: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                  </svg>`
        },
        {
            name: 'Kategorije',
            href: '/admin/kategorije',
            svg: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z" />
                  </svg>`
        },
        {
            name: 'Proizvodi',
            href: '/admin/proizvodi',
            svg: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                  </svg>`
        },
        {
            name: 'Porudžbine',
            href: '/admin/porudzbine',
            svg: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                    d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0-3.75-3.75M17.25 21 21 17.25" />
                </svg>`
        },
    ]

    open(){
        console.log('open')
        this.showMobileDrawer.set(true)
    }

    close() {
        this.showMobileDrawer.set(false)
    }

    sanitizeSvg(svg: string): SafeHtml {
        return this.sanitizer.bypassSecurityTrustHtml(svg)
    }

    logout() {
        this.close()
        this.auth.clear()
        this.router.navigate(['/prijava'])
    }
}

