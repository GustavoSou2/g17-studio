import { CommonModule, type NgStyle } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'skeleton',
  imports: [CommonModule],
  templateUrl: './skeleton.html',
  styleUrl: './skeleton.scss',
})
export class Skeleton {
  style = input<any[]>();
  class = input<string[]>();
}
