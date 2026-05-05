import { Component, DestroyRef, inject } from "@angular/core";
import { UiAdminService } from "../../../../core/services/ui-admin";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Component({
    selector: 'app-users',
    imports: [],
    templateUrl: './users.html'
})

export class Users {
    private ui = inject(UiAdminService);
    private destroyRef = inject(DestroyRef);

    constructor() {
        this.ui.createClicked$
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(() => {
                this.handleCreate();
            });
        
            this.simulateHTTPRequest()
        
    }

    simulateHTTPRequest() {
        this.ui.setLoading(true)
        setTimeout(() => {
            this.ui.setLoading(false)
        }, 1000)
    }

    handleCreate() {
        console.log('Create clicked');
    }
}