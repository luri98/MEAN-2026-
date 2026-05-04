import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({ providedIn: 'root' })
export class AlertService {

  private toastMixin = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 4000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    }
  });

  success(message: string) {
    this.toastMixin.fire({
      icon: 'success',
      title: message
    });
  }

  error(message: string, title = 'Greška!') {
    this.toastMixin.fire({
      icon: 'error',
      title,
      text: message
    });
  }

  async confirm(options: {
    title?: string,
    text?: string,
    confirmText?: string,
    cancelText?: string
  }): Promise<boolean> {

    const result = await Swal.fire({
      title: options.title ?? '',
      text: options.text ?? '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#4f9333',
      cancelButtonColor: 'red',
      confirmButtonText: options.confirmText ?? 'OK',
      cancelButtonText: options.cancelText ?? 'Cancel'
    });

    return result.isConfirmed;
  }
}