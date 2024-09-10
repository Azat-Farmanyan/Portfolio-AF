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
    const mediaQuery = window.matchMedia('(max-width: 600px)');

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      if (mediaQuery.matches) {
        // Only when viewport width is 600px or less
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.isVisible = true; // Add class `active-circle`
          } else {
            this.isVisible = false; // Remove class if element is not visible
          }
        });
      } else {
        this.isVisible = false; // Ensure the class is removed when viewport is larger
      }
    };

    const observer = new IntersectionObserver(observerCallback);
    observer.observe(this.el.nativeElement);

    // Re-observe the element when the viewport size changes
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
