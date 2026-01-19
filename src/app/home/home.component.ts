import { RouteService } from './../services/route.service';
import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SeoService } from '../services/seo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  scrollTop = false;
  prevPath: string = '';
  prevPathSubs: Subscription;

  clickedCard: number;
  currentSection: string = 'home';
  currentSectionId: number = 0;

  sections: string[] = ['home', 'about', 'experience', 'projects', 'contact'];

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private router: Router,
    private routeService: RouteService,
    private seoService: SeoService
  ) {}

  ngOnInit(): void {
    // SEO для главной страницы
    this.seoService.updateSEO({
      title: 'Azat Farmanyan - Frontend Developer | Портфолио',
      description: 'Портфолио Azat Farmanyan - Frontend разработчик. Опыт в Angular, React, TypeScript. Проекты, навыки и контакты.',
      keywords: 'Azat Farmanyan, Frontend Developer, Angular, React, TypeScript, JavaScript, Web Developer, Портфолио, Разработчик',
      url: 'https://azatfarmanyan.netlify.app/home'
    });
    this.prevPathSubs = this.routeService.previousPath.subscribe((prevPath) => {
      this.prevPath = prevPath;

      if (this.prevPath.includes('details')) {
        const cardId = +this.prevPath.split('/')[2];
        if (cardId) {
          this.clickedCard = cardId;
        }
      }
    });
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {
    this.detectActiveSection();
  }
  detectActiveSection(): void {
    const sections = this.el.nativeElement.querySelectorAll('section');

    for (let i = sections.length - 1; i >= 0; i--) {
      const section = sections[i];
      const rect = section.getBoundingClientRect();

      if (
        rect.top <= window.innerHeight / 2 &&
        rect.bottom >= window.innerHeight / 2
      ) {
        this.currentSection = section.id;
        this.getIndexOfActiveSection();
        break;
      }
    }
  }

  getIndexOfActiveSection() {
    if (this.sections.includes(this.currentSection)) {
      this.currentSectionId = this.sections.indexOf(this.currentSection);
    }
  }
  ngAfterViewInit() {
    this.scrollToProjects();
  }

  scrollToProjects() {
    if (this.prevPath.includes('details')) {
      // `#${this.openedCardId}`
      const projectsElement = this.el.nativeElement.querySelector('#projects');
      if (projectsElement) {
        this.renderer.setProperty(
          document.documentElement,
          'scrollTop',
          projectsElement.offsetTop
        );
      }
    }
  }
  ngOnDestroy(): void {
    if (this.prevPathSubs) this.prevPathSubs.unsubscribe();
  }
}
