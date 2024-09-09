import {
  Directive,
  ElementRef,
  HostBinding,
  OnInit,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appIntersectionObserver]',
  standalone: true,
})
export class IntersectionObserverDirective implements OnInit {
  @HostBinding('class.active-circle') isVisible = false;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.isVisible = true; // Добавляем класс `active-circle`
        } else {
          this.isVisible = false; // Убираем класс, если элемент больше не виден
        }
      });
    });

    observer.observe(this.el.nativeElement);
  }
}
