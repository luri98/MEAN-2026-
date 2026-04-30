// src/app/core/services/auth.service.ts
import { Injectable, signal } from '@angular/core'

type User = {
  token: string
  [key: string]: any
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly STORAGE_KEY = 'auth_user'

  private user = signal<User | null>(this.loadFromStorage())

  private loadFromStorage(): User | null {
    const data = localStorage.getItem(this.STORAGE_KEY)
    return data ? JSON.parse(data) : null
  }

  save(user: User) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user))
    this.user.set(user)
  }

  getUser() {
    return this.user()
  }

  getToken() {
    return this.user()?.token ?? null
  }

  isLoggedIn() {
    return !!this.user()
  }

  clear() {
    localStorage.removeItem(this.STORAGE_KEY)
    this.user.set(null)
  }
}