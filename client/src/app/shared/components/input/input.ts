import { Component, input, model } from '@angular/core'
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="flex flex-col gap-2 w-full">
      @if (label()) {
        <label [for]="inputId()" class="text-sm font-medium text-gray-700">
          {{ label() }}
        </label>
      }
      <input class="w-full px-3.5 py-2.5 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg outline-none transition-all duration-150 placeholder:text-gray-400 focus:border-teal-600"
        [id]="inputId()"
        [name]="name()"
        [type]="type()"
        [placeholder]="placeholder()"
        [ngModel]="value()"
        (ngModelChange)="value.set($event)"/>
        @if (error(); as errorMessage) {
          <div class="flex items-center space-x-1 pl-3">
            <svg class="size-4 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
            </svg>
            <p class="text-xs text-red-600">{{ errorMessage }}</p>
          </div>
        }
    </div>
  `
})

export class Input {
  inputId = input<string>('', { alias: 'inputId' })
  name = input<string>('')
  type = input<string>('text')
  placeholder = input<string>('')
  label = input<string>('')
  value = model<string>('')
  error = input<string | null | undefined>(null)
}