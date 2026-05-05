import { Injectable, signal } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UiAdminService {
  private createClickedSubject = new Subject<void>();

  createClicked$ = this.createClickedSubject.asObservable();

  triggerCreate() {
    this.createClickedSubject.next();
  }

  private loading = signal(false);

  setLoading(value: boolean) {
    this.loading.set(value);
  }

  getLoading() {
    return this.loading;
  }
}