import {
  Directive,
  ElementRef,
  HostBinding,
  OnInit,
  Renderer2,
  OnDestroy,
} from '@angular/core';

@Directive({
  selector: '[appProjectsBlockAnimation]',
  standalone: true,
})
export class ProjectsBlockAnimationDirective implements OnInit, OnDestroy {
  @HostBinding('class.animated-projects-block') animated = true;

  private observer?: IntersectionObserver;
  private isVisible = false;
  private mouseMoveHandler?: (event: MouseEvent) => void;
  private mouseLeaveHandler?: () => void;
  private rafId: number | null = null;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    this.initIntersectionObserver();
    this.initMouseInteraction();
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
    this.removeMouseListeners();
  }

  private initIntersectionObserver() {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !this.isVisible) {
          this.isVisible = true;
          this.renderer.addClass(this.el.nativeElement, 'is-visible');

          // Анимация каскадная для карточек
          const cards = this.el.nativeElement.querySelectorAll('app-project-card-v3');
          cards.forEach((card: HTMLElement, index: number) => {
            setTimeout(() => {
              this.renderer.addClass(card, 'card-visible');
            }, index * 150);
          });
        }
      });
    };

    this.observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px',
    });

    this.observer.observe(this.el.nativeElement);
  }

  private initMouseInteraction() {
    if (window.innerWidth <= 768) return; // Только для десктопа

    this.mouseMoveHandler = (event: MouseEvent) => {
      if (this.rafId !== null) {
        cancelAnimationFrame(this.rafId);
      }

      this.rafId = requestAnimationFrame(() => {
        const rect = this.el.nativeElement.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -8;
        const rotateY = ((x - centerX) / centerX) * 8;

        this.renderer.setStyle(
          this.el.nativeElement,
          'transform',
          `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`
        );

        // Магнитный эффект для карточек
        const cards = this.el.nativeElement.querySelectorAll('app-project-card-v3');
        cards.forEach((card: HTMLElement) => {
          const cardRect = card.getBoundingClientRect();
          const cardCenterX = cardRect.left + cardRect.width / 2;
          const cardCenterY = cardRect.top + cardRect.height / 2;

          const deltaX = event.clientX - cardCenterX;
          const deltaY = event.clientY - cardCenterY;

          const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
          const maxDistance = 250;

          if (distance < maxDistance && distance > 0) {
            const moveX = (deltaX / distance) * (maxDistance - distance) * 0.25;
            const moveY = (deltaY / distance) * (maxDistance - distance) * 0.25;

            this.renderer.setStyle(
              card,
              'transform',
              `translate(${moveX}px, ${moveY}px) scale(1.03)`
            );
          } else {
            this.renderer.setStyle(card, 'transform', 'translate(0, 0) scale(1)');
          }
        });
      });
    };

    this.mouseLeaveHandler = () => {
      if (this.rafId !== null) {
        cancelAnimationFrame(this.rafId);
        this.rafId = null;
      }

      this.renderer.setStyle(
        this.el.nativeElement,
        'transform',
        'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
      );

      const cards = this.el.nativeElement.querySelectorAll('app-project-card-v3');
      cards.forEach((card: HTMLElement) => {
        this.renderer.setStyle(card, 'transform', 'translate(0, 0) scale(1)');
      });
    };

    this.el.nativeElement.addEventListener('mousemove', this.mouseMoveHandler, { passive: true });
    this.el.nativeElement.addEventListener('mouseleave', this.mouseLeaveHandler);
  }

  private removeMouseListeners() {
    if (this.mouseMoveHandler) {
      this.el.nativeElement.removeEventListener('mousemove', this.mouseMoveHandler);
    }
    if (this.mouseLeaveHandler) {
      this.el.nativeElement.removeEventListener('mouseleave', this.mouseLeaveHandler);
    }
  }
}
