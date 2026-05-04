import { Component, inject, signal } from '@angular/core'
import { Router, RouterLink } from '@angular/router'
import { Input } from '../../../../shared/components/input/input'
import { Spinner } from '../../../../shared/components/spinner/spinner'
import { Api } from '../../../../core/services/api'
import { AuthService } from '../../../../core/services/auth'
import { FormErrorsService } from '../../../../core/services/form-errors'
import { AlertService } from '../../../../core/services/alert'

type Form = {
  name: string
  email: string
}

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [Input, Spinner],
  template: `
    <div class="h-full w-full flex flex-col p-8 bg-white rounded-2xl shadow-sm border border-gray-200">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-2xl font-semibold text-gray-900">Lični podaci</h1>
      </div>

      <!-- Form -->
      <div class="flex flex-col h-full">
        <!-- Name -->
        <app-input
          inputId="name"
          name="name"
          label="Ime i prezime"
          placeholder="Unesite Vaše Ime i prezime"
          [error]="formErrors.errors()['name']"
          [value]="form().name"
          (valueChange)="updateForm('name', $event)"/>

        <!-- Email -->
        <app-input class="mt-5"
          inputId="email"
          name="email"
          type="email"
          label="E-mail"
          placeholder="Unesite Vašu e-mail adresu"
          [error]="formErrors.errors()['email']"
          [value]="form().email"
          (valueChange)="updateForm('email', $event)"/>

        <!-- Submit -->
        <button class="mt-10 md:mt-auto w-full py-2.5 px-4 bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium rounded-lg transition-colors duration-150 flex items-center justify-center gap-2 cursor-pointer"
            [class]="loading() ? 'pointer-events-none' : 'cursor-pointer'"
            [disabled]="loading()"
            (click)="submit()">
          @if (loading()) { <app-spinner color="white" /> } 
          @else {<span>Sačuvaj</span> }
        </button>
      </div>
    </div>
  `
})

export class UserForm {
  private api = inject(Api)
  private auth = inject(AuthService)
  private alert = inject(AlertService)

  user = this.auth.getUser()
  formErrors = inject(FormErrorsService)

  loading = signal(false)

  form = signal<Form>({
    name: this.user()?.name ?? '',
    email: this.user()?.email ?? ''
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

    this.api.put<{ user: any }>(`/users/${this.user()?.id}`, this.form()).subscribe({
      next: (response) => {
        const oldUser = this.auth.getUser()

        if (!oldUser()?.token) {
          this.loading.set(false)
          return
        }

        this.auth.save({
          ...response.user,
          token: oldUser()?.token
        })

        this.loading.set(false)
        this.alert.success('Lični podaci su uspješno promijenjeni')
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