import { Component, inject } from '@angular/core';
import { ToastService } from './toast.service';
import { CommonModule } from '@angular/common';
import { map } from 'rxjs';

@Component({
  selector: 'toastr',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
})
export class ToastComponent {
  toastService = inject(ToastService);

  toastrs$ = this.toastService.getToasts().pipe(map(toasts => toasts ?? []));

  removeToast(id: number) {
    this.toastService.removeToast(id);
  }
}
