import { Component, inject, signal } from '@angular/core'
import { UserForm } from './partials/UserForm/form'
import { PasswordForm } from './partials/PasswordForm/form'


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [UserForm, PasswordForm],
  templateUrl: './profile.html'
})
export class Profile {

}