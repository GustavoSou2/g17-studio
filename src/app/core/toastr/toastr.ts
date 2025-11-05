import { Injectable } from '@angular/core';
import * as toastr from 'toastr';  
import 'toastr/build/toastr.min.css';

@Injectable({
  providedIn: 'root',
})
export class Toastr {
  show(message: string, status: 'info' | 'success' | 'warning' | 'error' = 'info') {
    toastr?.[status](message);  
  }
}
