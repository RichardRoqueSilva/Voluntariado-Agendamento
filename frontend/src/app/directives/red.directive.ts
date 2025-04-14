import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appRed]',
  standalone: true,
})
export class RedDirective {

  constructor(private el: ElementRef) {
    el.nativeElement.style.color = '#e35e6b'
  }

}
