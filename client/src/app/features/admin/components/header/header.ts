import { Component, inject, signal } from "@angular/core";
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from "@angular/router";
import { Spinner } from "../../../../shared/components/spinner/spinner";
import { toSignal } from "@angular/core/rxjs-interop";
import { filter, map, startWith } from "rxjs";
import { EventBusService } from "../../../../core/services/event-bus";
import { UiStateService } from "../../../../core/services/ui-state";

@Component({
    selector: 'app-admin-header',
    imports: [Spinner],
    template: `
        <header class="w-full lg:border-b border-gray-200 px-6 lg:px-8 lg:py-4 mt-6 lg:mt-0 flex items-center space-x-6 justify-end lg:justify-between lg:min-h-20">
            <div class="min-w-0 flex-1 hidden lg:flex items-center space-x-6 w-full">
                <h1 class="text-xl text-gray-900 sm:truncate tracking-[0.34px] font-semibold">{{ sectionName() }}</h1>
                @if (uiState.loading()) { <app-spinner color="#00695C" /> }
            </div>
            <button class="flex items-center justify-center gap-2 py-2.5 px-4 bg-teal-600 hover:bg-teal-700  rounded-lg transition-colors duration-150 cursor-pointer"
                (click)="emitCreate()">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 text-white">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                <span class="text-white text-sm font-medium">Kreiraj</span>
            </button>
        </header>
    `,
})

export class AdminHeader {
    private router = inject(Router)
    readonly eventBus = inject(EventBusService);
    readonly uiState = inject(UiStateService);

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

    emitCreate() {
        this.eventBus.emit({type: 'action:create'});
    }
}