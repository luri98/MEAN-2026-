import { Injectable, signal } from '@angular/core'

type ValidationError = {
  msg: string
  path: string
}

@Injectable({
  providedIn: 'root'
})
export class FormErrorsService {
  readonly errors = signal<Record<string, string>>({})

  getError(field: string) {
    return this.errors()[field] ?? null
  }

  recordErrors(errors: ValidationError[]) {
    const formattedErrors: Record<string, string> = {}

    errors.forEach(error => {
      if (!formattedErrors[error.path]) {
        formattedErrors[error.path] = error.msg
      }
    })

    this.errors.set(formattedErrors)
  }

  deleteError(field: string) {
    this.errors.update(errors => {
      const newErrors = { ...errors }

      delete newErrors[field]

      return newErrors
    })
  }

  deleteAllErrors() {
    this.errors.set({})
  }
}