import { Component, inject, signal } from '@angular/core';
import { Input } from '../../shared/components/input/input';
import { Spinner } from '../../shared/components/spinner/spinner';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Api } from '../../core/services/api';
import { FormErrorsService } from '../../core/services/form-errors';
import { AlertService } from '../../shared/services/alert';

type Form = {
  password: string
  confirmPassword: string
}

@Component({
  selector: 'app-reset-password',
  imports: [Input, Spinner],
  templateUrl: './reset-password.html',
  styles: ``,
})
export class ResetPassword {
  private api = inject(Api)
  private router = inject(Router)
  private route = inject(ActivatedRoute)
  private alert = inject(AlertService);
  readonly formErrors = inject(FormErrorsService)

  loading = signal(false)
  form = signal<Form>({
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

  submit() {
    this.loading.set(true)
    this.formErrors.deleteAllErrors()
    const token = this.route.snapshot.paramMap.get('token')

    this.api.post<{ token: string, user: any }>(`/auth/reset-password/${token}`, this.form()).subscribe({
      next: (response) => {
        this.loading.set(false)
        this.alert.success('Uspješno ste promijenili lozinku! Sada se možete prijaviti.')
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
}
