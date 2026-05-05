import { Component, DestroyRef, inject } from "@angular/core";
import { UiAdminService } from "../../../../core/services/ui-admin";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Component({
    selector: 'app-categories',
    imports: [],
    templateUrl: './categories.html'
})

export class Categories {
    private ui = inject(UiAdminService);
    private destroyRef = inject(DestroyRef);

    constructor() {
        this.ui.createClicked$
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(() => {
                this.handleCreate();
            });
    }

    handleCreate() {
        console.log('Create clicked');
    }
}