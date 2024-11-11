import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appHighlightDirective]',
  standalone: true
})
export class HighlightDirectiveDirective {

  constructor(private eleRef:ElementRef) {
    console.log('directive is using')
    this.eleRef.nativeElement.style.background = 'red';
  }
}
