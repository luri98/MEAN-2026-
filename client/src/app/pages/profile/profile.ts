import { Component, inject, signal } from '@angular/core'
import { UserForm } from './partials/UserForm/form'
import { PasswordForm } from './partials/PasswordForm/form'
import { FormErrorsService } from '../../core/services/form-errors'


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [UserForm, PasswordForm],
  templateUrl: './profile.html'
})
export class Profile {
  private formErrors = inject(FormErrorsService)
  
  ngOnInit() {
    this.formErrors.deleteAllErrors()
  }
}