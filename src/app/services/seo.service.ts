import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';

export interface SEOData {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  private readonly defaultTitle = 'Azat Farmanyan - Frontend Developer | Портфолио';
  private readonly defaultDescription = 'Портфолио Azat Farmanyan - Frontend разработчик. Опыт в Angular, React, TypeScript. Проекты, навыки и контакты.';
  private readonly defaultImage = 'https://azatfarmanyan.netlify.app/assets/og-image.jpg';
  private readonly baseUrl = 'https://azatfarmanyan.netlify.app';

  constructor(
    private title: Title,
    private meta: Meta,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  /**
   * Инициализация SEO для приложения
   */
  init(): void {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.activatedRoute),
        map((route) => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        mergeMap((route) => route.data)
      )
      .subscribe((data) => {
        if (data['seo']) {
          this.updateSEO(data['seo']);
        }
      });
  }

  /**
   * Обновление SEO мета-тегов
   */
  updateSEO(data: SEOData): void {
    const title = data.title || this.defaultTitle;
    const description = data.description || this.defaultDescription;
    const image = data.image || this.defaultImage;
    const url = data.url || this.baseUrl + this.router.url;
    const type = data.type || 'website';
    const keywords = data.keywords || 'Azat Farmanyan, Frontend Developer, Angular, React, TypeScript';

    // Обновление title
    this.title.setTitle(title);

    // Primary Meta Tags
    this.meta.updateTag({ name: 'title', content: title });
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ name: 'keywords', content: keywords });

    // Open Graph
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:image', content: image });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:type', content: type });

    // Twitter Card
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: title });
    this.meta.updateTag({ name: 'twitter:description', content: description });
    this.meta.updateTag({ name: 'twitter:image', content: image });
    this.meta.updateTag({ name: 'twitter:url', content: url });

    // Canonical URL
    this.updateCanonicalUrl(url);
  }

  /**
   * Обновление canonical URL
   */
  private updateCanonicalUrl(url: string): void {
    let link: HTMLLinkElement | null = document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }

  /**
   * Добавление структурированных данных (JSON-LD)
   * @param data - данные для структурированной разметки
   * @param id - уникальный идентификатор скрипта (по умолчанию 'structured-data')
   */
  addStructuredData(data: any, id: string = 'structured-data'): void {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(data);
    script.id = id;

    // Удаляем старые структурированные данные с таким же ID, если есть
    const existingScript = document.getElementById(id);
    if (existingScript) {
      existingScript.remove();
    }

    document.head.appendChild(script);
  }

  /**
   * Удаление всех структурированных данных
   */
  clearStructuredData(): void {
    const scripts = document.querySelectorAll('script[type="application/ld+json"]');
    scripts.forEach(script => script.remove());
  }

  /**
   * Получение структурированных данных для Person
   */
  getPersonStructuredData(): any {
    return {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Azat Farmanyan',
      jobTitle: 'Software Engineer',
      alternateName: 'Frontend Developer',
      url: this.baseUrl,
      sameAs: [
        'https://www.linkedin.com/in/azat-farmanyan/',
        'https://github.com/Azat-Farmanyan',
        'https://t.me/AzatFarmanyan',
        'https://discordapp.com/users/908978735020146719/',
        'https://www.instagram.com/azat_09.5/',
        'https://www.facebook.com/profile.php?id=100007929288834'
      ],
      knowsAbout: [
        'Angular',
        'React',
        'TypeScript',
        'JavaScript',
        'Node.js',
        'SCSS',
        'HTML',
        'CSS',
        'Frontend Development',
        'Web Development',
        'Full Stack Development',
        'REST API',
        'RxJS',
        'NgRx',
        'Angular Material'
      ],
      alumniOf: {
        '@type': 'EducationalOrganization',
        name: 'Samtskhe-Javakheti State University',
        description: 'Faculty of Engineering, Agriculture, and Life Sciences'
      }
    };
  }

  /**
   * Получение структурированных данных для Portfolio
   */
  getPortfolioStructuredData(): any {
    return {
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      name: 'Azat Farmanyan Portfolio',
      description: this.defaultDescription,
      url: this.baseUrl,
      author: {
        '@type': 'Person',
        name: 'Azat Farmanyan'
      },
      creator: {
        '@type': 'Person',
        name: 'Azat Farmanyan'
      }
    };
  }
}
