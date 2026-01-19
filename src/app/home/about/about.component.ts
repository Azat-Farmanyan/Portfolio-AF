import { Component, Input, OnInit, AfterViewInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { Skill, SkillsService } from 'src/app/services/skills.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() activeSection: string = '';
  @ViewChild('skillsContainer', { static: false }) skillsContainer!: ElementRef;
  @ViewChild('contentWrapper', { static: false }) contentWrapper!: ElementRef;
  skills: Skill[] = [];
  readMore = false;
  isPaused = false;
  private scaleInterval: any;
  private intersectionObserver?: IntersectionObserver;

  constructor(private skillsService: SkillsService) {
    this.skills = this.skillsService.getSkills();
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.updateCardScales();
    this.scaleInterval = setInterval(() => {
      this.updateCardScales();
    }, 100);

    this.setupScrollAnimation();
  }

  ngOnDestroy(): void {
    if (this.scaleInterval) {
      clearInterval(this.scaleInterval);
    }
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }
  }

  updateCardScales(): void {
    if (!this.skillsContainer) return;

    const container = this.skillsContainer.nativeElement;
    const wrapper = container.closest('.skills-scroll-wrapper');
    if (!wrapper) return;

    const wrapperRect = (wrapper as HTMLElement).getBoundingClientRect();
    const wrapperCenter = wrapperRect.left + wrapperRect.width / 2;

    const cards = container.querySelectorAll('.skill-card');
    cards.forEach((card: HTMLElement) => {
      const cardRect = card.getBoundingClientRect();
      const cardCenter = cardRect.left + cardRect.width / 2;
      const distanceFromCenter = Math.abs(cardCenter - wrapperCenter);
      const maxDistance = wrapperRect.width / 2;
      const normalizedDistance = Math.min(distanceFromCenter / maxDistance, 1);

      // Scale от 1.0 (центр) до 0.75 (края)
      const scaleFactor = 1 - normalizedDistance * 0.25;
      // Opacity от 1.0 (центр) до 0.2 (20% видимость на краях)
      const opacityFactor = 1 - normalizedDistance * 0.8;

      card.style.transform = `scale(${Math.max(0.75, Math.min(1.0, scaleFactor))})`;
      card.style.opacity = `${Math.max(0.2, Math.min(1.0, opacityFactor))}`;
    });
  }

  pauseScroll() {
    this.isPaused = true;
  }

  resumeScroll() {
    this.isPaused = false;
  }

  private setupScrollAnimation(): void {
    if (typeof IntersectionObserver === 'undefined') {
      // Fallback для браузеров без поддержки IntersectionObserver
      // Показываем карточки сразу, если нет поддержки IntersectionObserver
      setTimeout(() => {
        if (this.contentWrapper) {
          const cards = this.contentWrapper.nativeElement.querySelectorAll('.text-card.scroll-animate');
          cards.forEach((card: HTMLElement) => {
            card.classList.add('visible');
          });
        }
      }, 100);
      return;
    }

    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15 // Срабатывает, когда 15% элемента видно
    };

    this.intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Отключаем наблюдение после появления, чтобы анимация не повторялась
          this.intersectionObserver?.unobserve(entry.target);
        }
      });
    }, options);

    // Наблюдаем за карточками после небольшой задержки, чтобы DOM был готов
    setTimeout(() => {
      if (this.contentWrapper) {
        const cards = this.contentWrapper.nativeElement.querySelectorAll('.text-card.scroll-animate');
        cards.forEach((card: HTMLElement) => {
          // Проверяем, видна ли карточка уже при загрузке
          const rect = card.getBoundingClientRect();
          const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

          if (isVisible) {
            // Если карточка уже видна, добавляем класс с небольшой задержкой
            setTimeout(() => {
              card.classList.add('visible');
            }, 100);
          } else {
            // Иначе начинаем наблюдение
            this.intersectionObserver?.observe(card);
          }
        });
      }
    }, 100);
  }
}
