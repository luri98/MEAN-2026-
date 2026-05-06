import { Injectable, signal } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EventBusService {
  private eventSubject = new Subject<any>();

  event$ = this.eventSubject.asObservable();

  emit(event:any) {
    this.eventSubject.next(event);
  }

  private loading = signal(false);

  setLoading(value: boolean) {
    this.loading.set(value);
  }

  getLoading() {
    return this.loading;
  }
}