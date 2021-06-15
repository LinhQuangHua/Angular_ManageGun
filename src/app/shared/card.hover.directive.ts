import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appCardHover]',
})
export class CardHoverDirective {
  constructor(private el: ElementRef) {
    el.nativeElement.style.transition = '.3s';
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.el.nativeElement.style.transform = 'scale(1.1)';
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.el.nativeElement.style.transform = 'scale(1)';
  }
}
