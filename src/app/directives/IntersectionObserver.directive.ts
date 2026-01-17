import {
  Directive,
  ElementRef,
  HostBinding,
  Input,
  OnInit,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appIntersectionObserver]',
  standalone: true,
})
export class IntersectionObserverDirective implements OnInit {
  @HostBinding('class.active-circle') isVisible = false;
  @Input() onlyMobile: boolean = false; // Флаг для ограничения только мобильными устройствами

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    const mediaQuery = window.matchMedia('(max-width: 600px)');

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      // Если onlyMobile = true, работаем как раньше (только на мобильных)
      // Если onlyMobile = false (по умолчанию), работаем на всех устройствах
      if (this.onlyMobile && !mediaQuery.matches) {
        this.isVisible = false;
        return;
      }

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.isVisible = true; // Add class `active-circle`
        } else {
          // Убираем класс только если толькоMobile = true
          if (this.onlyMobile) {
            this.isVisible = false;
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.3, // Элемент считается видимым, когда видно 30%
      rootMargin: '0px 0px -50px 0px', // Небольшой отступ снизу для более плавного срабатывания
    });

    observer.observe(this.el.nativeElement);

    // Re-observe the element when the viewport size changes (только если onlyMobile = true)
    if (this.onlyMobile) {
      mediaQuery.addEventListener('change', () => {
        if (!mediaQuery.matches) {
          this.isVisible = false; // Remove the class when viewport exceeds 600px
        } else {
          // Trigger observer again to check element's visibility at new size
          observer.disconnect(); // Stop the current observation
          observer.observe(this.el.nativeElement); // Reobserve with updated conditions
        }
      });
    }
  }
}
