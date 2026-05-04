import { Injectable, signal, inject, PLATFORM_ID, computed } from '@angular/core'
import { isPlatformBrowser } from '@angular/common'
import { User } from '../../models/user.model'


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly STORAGE_KEY = 'auth_user'

  private platformId = inject(PLATFORM_ID)
  private isBrowser = isPlatformBrowser(this.platformId)

  private user = signal<User | null>(this.loadFromStorage())
  readonly isAdmin = computed(() => this.user()?.role === 'admin');

  private loadFromStorage(): User | null {
    if (!this.isBrowser) return null

    const data = localStorage.getItem(this.STORAGE_KEY)
    return data ? JSON.parse(data) : null
  }

  save(user: User) {
    if (this.isBrowser) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user))
    }
    this.user.set(user)
  }

  clear() {
    if (this.isBrowser) {
      localStorage.removeItem(this.STORAGE_KEY)
    }
    this.user.set(null)
  }

  getUser() {
    return this.user
  }

  getToken() {
    return this.user()?.token ?? null
  }

  isLoggedIn() {
    return !!this.user()
  }
}