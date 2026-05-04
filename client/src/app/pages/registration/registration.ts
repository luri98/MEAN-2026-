import { Component, inject, signal } from '@angular/core'
import { Router } from '@angular/router'
import { Api } from '../../../app/core/services/api'
import { FormErrorsService } from '../../../app/core/services/form-errors'
import { AuthService } from '../../../app/core/services/auth'
import { Input } from '../../shared/components/input/input'
import { Spinner } from '../../shared/components/spinner/spinner'
import { AlertService } from '../../shared/services/alert'

type Form = {
  email: string
  password: string
  name: string,
  confirmPassword: string
}

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [Input, Spinner],
  templateUrl: './registration.html'
})
export class Registration {
  private api = inject(Api)
  private router = inject(Router)
  private alert = inject(AlertService);
  readonly formErrors = inject(FormErrorsService)

  loading = signal(false)

  form = signal<Form>({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  updateForm(field: keyof Form, value: string) {
    this.formErrors.deleteError(field)
    this.form.update(form => ({
      ...form,
      [field]: value
    }))
  }

  register() {
    this.loading.set(true)
    
    this.api.post<{ token: string, user: any }>('/auth/register', this.form()).subscribe({
      next: (response) => {
        this.loading.set(false)
        this.alert.success('Uspješno ste se registrovali! Sada se možete prijaviti.')
        this.router.navigate(['/prijava'])
      },
      error: (err) => {
        if (err.status === 422) {
          this.formErrors.recordErrors(err.error.errors)
        }
        this.loading.set(false)
      }
    })
  }

  ngOnInit() {
    this.formErrors.deleteAllErrors()
  }
}