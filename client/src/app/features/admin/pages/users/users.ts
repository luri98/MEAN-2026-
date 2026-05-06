import { Component, DestroyRef, inject } from "@angular/core";
import { EventBusService } from "../../../../core/services/event-bus";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { UiStateService } from "../../../../core/services/ui-state";

@Component({
    selector: 'app-users',
    imports: [],
    templateUrl: './users.html'
})

export class Users {
    private eventBus = inject(EventBusService);
    private uiState = inject(UiStateService)
    private destroyRef = inject(DestroyRef);

    simulateHTTPRequest() {
        this.uiState.setLoading(true)
        setTimeout(() => {
            this.uiState.setLoading(false)
        }, 1000)
    }

    handleCreate() {
        console.log('Create clicked');
    }

    ngOnInit() {
        this.eventBus.event$
            .pipe(takeUntilDestroyed(this.destroyRef))
             .subscribe(event => {
                if(event.type == 'action:create')
                    this.handleCreate()
            });
        
        this.simulateHTTPRequest()
    }
}