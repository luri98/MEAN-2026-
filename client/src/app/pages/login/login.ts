import { Component, inject, signal } from '@angular/core'
import { Router, RouterLink } from '@angular/router'
import { Api } from '../../../app/core/services/api'
import { FormErrorsService } from '../../../app/core/services/form-errors'
import { AuthService } from '../../../app/core/services/auth'
import { Input } from '../../shared/components/input/input'
import { Spinner } from '../../shared/components/spinner/spinner'

type Credentials = {
  email: string
  password: string
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [Input, Spinner, RouterLink],
  templateUrl: './login.html'
})
export class Login {
  private api = inject(Api)
  private router = inject(Router)
  private auth = inject(AuthService)

  formErrors = inject(FormErrorsService)

  loading = signal(false)

  credentials = signal<Credentials>({
    email: '',
    password: ''
  })

  updateCredentials(field: keyof Credentials, value: string) {
    this.formErrors.deleteError(field)
    this.credentials.update(credentials => ({
      ...credentials,
      [field]: value
    }))
  }

  login() {
    this.loading.set(true)
    this.formErrors.deleteAllErrors()
    
    this.api.post<{ token: string, user: any }>('/auth/login', this.credentials()).subscribe({
      next: (response) => {
        this.auth.save({
          ...response.user,
          token: response.token
        })
        this.loading.set(false)
        this.router.navigate(['/'])
      },
      error: (err) => {
        if (err.status === 422) {
          this.formErrors.recordErrors(err.error.errors)
        }else if(err.status == 401){
          this.formErrors.recordErrors([{ path: 'email', msg: 'Neispravni kredencijali' }]) 
        }

        this.loading.set(false)
      }
    })
  }
}