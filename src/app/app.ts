import { Component, signal, type AfterViewInit, type OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastComponent } from './shared/components/toast/toast.component';
import * as AOS from 'aos';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToastComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit, AfterViewInit {
  protected readonly title = signal('G17 Studio');
  ngOnInit() {
    AOS.init();
  }

  ngAfterViewInit() {
    AOS.refresh();
  }
}
