// toast.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

interface Toast {
  title: string;
  message: string;
  duration: number;
  icon: string;
  id: number;
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toasts: Toast[] = [];
  private toastSubject = new BehaviorSubject<Toast[]>([]);
  private toastId = 0;

  constructor() {}

  getToasts() {
    return this.toastSubject.asObservable();
  }

  addToast(
    title: string,
    message: string,
    icon: string = 'fas fa-solid fa-check check',
    duration: number = 4000,
    isClosable: boolean = true
  ) {
    this.toastId += 1;

    const newToast: Toast = {
      title,
      message,
      icon,
      duration,
      id: this.toastId,
    };

    this.toasts.push(newToast);
    this.toastSubject.next(this.toasts);

    if (isClosable)
      setTimeout(() => {
        this.removeToast(newToast.id);
      }, duration + 1000);
  }

  removeToast(id: number) {
    this.toasts = this.toasts.filter((toast) => toast.id !== id);
    this.toastSubject.next(this.toasts);
  }
}
