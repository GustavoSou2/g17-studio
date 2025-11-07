import {
  Component,
  Inject,
  PLATFORM_ID,
  signal,
  type AfterViewInit,
  type OnInit,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastComponent } from './shared/components/toast/toast.component';
import * as AOS from 'aos';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToastComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit, AfterViewInit {
  protected readonly title = signal('G17 Studio');
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      import('aos').then((AOS) => AOS.init());
    }
  }

  ngAfterViewInit() {
    AOS.refresh();
  }
}
