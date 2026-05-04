import { Component, inject, signal } from '@angular/core';
import { AlertService } from '../../core/services/alert';
import { FormErrorsService } from '../../core/services/form-errors';
import { Input } from '../../shared/components/input/input';
import { Api } from '../../core/services/api';
import { Spinner } from '../../shared/components/spinner/spinner';

@Component({
  selector: 'app-forgotten-password',
  imports: [Input, Spinner],
  templateUrl: './forgotten-password.html',
})
export class ForgottenPassword {
  private api = inject(Api)
  private alert = inject(AlertService)
  readonly formErrors = inject(FormErrorsService)
  
  email = signal('')
  loading = signal(false)

  submit(){
    this.loading.set(true)
    this.formErrors.deleteAllErrors()
    
    this.api.post<{ token: string, user: any }>('/auth/forgotten-password', { email: this.email()}).subscribe({
      next: (response) => {
        
      },
      error: (err) => {
        if (err.status === 422) {
          this.formErrors.recordErrors(err.error.errors)
        }
        this.loading.set(false)
      },
      complete: () => {
        this.loading.set(false)
        this.alert.success('Uskoro će vam stići e-mail za reset lozinke!')
      }
    }) 
  }

  ngOnInit() {
    this.formErrors.deleteAllErrors()
  }
}
