import { Component, inject, signal } from '@angular/core'
import { Router, RouterLink } from '@angular/router'
import { Input } from '../../../../shared/components/input/input'
import { Spinner } from '../../../../shared/components/spinner/spinner'
import { Api } from '../../../../core/services/api'
import { AuthService } from '../../../../core/services/auth'
import { FormErrorsService } from '../../../../core/services/form-errors'
import { AlertService } from '../../../../core/services/alert'

type Form = {
  password: string
  newPassword: string,
  confirmNewPassword: string
}

@Component({
  selector: 'app-password-form',
  standalone: true,
  imports: [Input, Spinner],
  template: `
  <div class="h-full w-full flex flex-col p-8 bg-white rounded-2xl shadow-sm border border-gray-200">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-2xl font-semibold text-gray-900">Promijena lozinke</h1>
      </div>

      <!-- Form -->
      <div class="flex flex-col">
        <!-- Password -->
        <app-input
          inputId="password"
          name="password"
          type="password"
          label="Stara lozinka"
          placeholder="Unesite staru lozinku"
          [error]="formErrors.errors()['password']"
          [value]="form().password"
          (valueChange)="updateForm('password', $event)"/>

        <!-- New Password -->
        <app-input class="mt-5"
          inputId="newPassword"
          name="newPassword"
          type="password"
          label="Nova lozinka"
          placeholder="Unesite novu lozinku"
          [error]="formErrors.errors()['newPassword']"
          [value]="form().newPassword"
          (valueChange)="updateForm('newPassword', $event)"/>

        <!-- Confirm New Password -->
        <app-input class="mt-5"
          inputId="confirmNewPassword"
          name="confirmNewPassword"
          type="password"
          label="Potvrdite novu lozinku"
          placeholder="Potvrdite novu lozinku"
          [error]="formErrors.errors()['confirmNewPassword']"
          [value]="form().confirmNewPassword"
          (valueChange)="updateForm('confirmNewPassword', $event)"/>
      
        <!-- Submit -->
        <button class="mt-10 w-full py-2.5 px-4 bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium rounded-lg transition-colors duration-150 flex items-center justify-center gap-2 cursor-pointer"
            [class]="loading() ? 'pointer-events-none' : 'cursor-pointer'"
            [disabled]="loading()"
            (click)="submit()">
          @if (loading()) { <app-spinner color="white" /> } 
          @else {<span>Promijeni lozinku</span> }
        </button>

      </div>
    </div>
  `
})

export class PasswordForm {
  private api = inject(Api)
  private alert = inject(AlertService)
  private auth = inject(AuthService)

  formErrors = inject(FormErrorsService)

  loading = signal(false)

  form = signal<Form>({
    password: '',
    newPassword: '',
    confirmNewPassword: ''
  })

  updateForm(field: keyof Form, value: string) {
    this.formErrors.deleteError(field)
    this.form.update(form => ({
      ...form,
      [field]: value
    }))
  }
  
  submit() {
    this.loading.set(true)
    this.formErrors.deleteAllErrors()
    
    this.api.patch<{ token: string, user: any }>('/users/password', this.form()).subscribe({
      next: (response) => {
        this.form.set({
          password: '',
          newPassword: '',
          confirmNewPassword: ''
        })

        this.loading.set(false)
        this.alert.success('Lozinka uspješno promijenjena')
      },
      error: (err) => {
        if (err.status === 422) {
          this.formErrors.recordErrors(err.error.errors)
        }
        this.loading.set(false)
      }
    })
  }
}