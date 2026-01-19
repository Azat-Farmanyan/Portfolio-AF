import {
  trigger,
  transition,
  style,
  animate,
  query,
  sequence,
  stagger,
  state,
} from '@angular/animations';
import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Renderer2,
  SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-header-v2',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('toggleAnimation', [
      transition(':enter', [
        style({ transform: 'rotate(0deg)', opacity: 0 }),
        animate('300ms', style({ transform: 'rotate(180deg)', opacity: 1 })),
      ]),
      transition(':leave', [
        style({ transform: 'rotate(180deg)', opacity: 1 }),
        animate('0ms', style({ transform: 'rotate(0deg)', opacity: 0 })),
      ]),
    ]),

    trigger('dropDownMenu', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(
          '200ms cubic-bezier(0.4, 0, 0.2, 1)',
          style({ opacity: 1 })
        ),
        query(
          '.menu-item',
          [
            style({ opacity: 0, transform: 'translateX(-30px)' }),
            stagger(80, [
              animate(
                '300ms cubic-bezier(0.4, 0, 0.2, 1)',
                style({ opacity: 1, transform: 'translateX(0)' })
              ),
            ]),
          ],
          { optional: true }
        ),
      ]),

      transition(':leave', [
        query(
          '.menu-item',
          [
            stagger(-40, [
              animate(
                '200ms cubic-bezier(0.4, 0, 0.2, 1)',
                style({ opacity: 0, transform: 'translateX(-30px)' })
              ),
            ]),
          ],
          { optional: true }
        ),
        animate(
          '150ms cubic-bezier(0.4, 0, 0.2, 1)',
          style({ opacity: 0 })
        ),
      ]),
    ]),

    trigger('crossFade', [
      state('false', style({ opacity: 0 })),
      state('true', style({ opacity: 1 })),
      transition('false <=> true', animate('1000ms')),
      transition(':leave', [animate('1000ms', style({ opacity: 0 }))]), //<--animate to get opacity 0 in 1000ms
    ]),

    trigger('fadeInOut', [
      transition(':enter', [
        // :enter is alias to 'void => *'
        style({ opacity: 0 }),
        animate(500, style({ opacity: 1 })),
      ]),
      transition(':leave', [
        // :leave is alias to '* => void'
        animate(500, style({ opacity: 0 })),
      ]),
    ]),

    trigger('fadeOutUpAndFadeInDown', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-65px) scale(0.95)' }),
        animate(
          '400ms cubic-bezier(0.4, 0, 0.2, 1)',
          style({ opacity: 1, transform: 'translateY(0) scale(1)' })
        ),
      ]),
    ]),
  ],
})
export class HeaderComponentV2 implements OnInit {
  @Input() scrollTop: boolean = false;
  @Input() activeSection: string = '';
  @Input() opacity: number = 0.9;
  @Input() closeFromTopPx: number = 80;

  showMenu = false;
  scrolled = false;
  mobileView = false;
  currentLanguage: string = 'en';
  scrollProgress: number = 0;

  public getScreenWidth!: number;
  public getScreenHeight!: number;

  constructor(
    private router: Router,
    private translateService: TranslateService,
    private languageService: LanguageService
  ) {
    this.scrolled = window.pageYOffset < 80;
  }

  // Метод для переключения языка
  switchLanguage() {
    this.currentLanguage = this.currentLanguage === 'en' ? 'ru' : 'en';
    this.translateService.use(this.currentLanguage);
    this.languageService.activeLanguage.set(this.currentLanguage);
  }

  ngOnInit() {
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;
    this.mobileView = window.innerWidth <= 675;
    this.checkScrollPosition();
    this.updateScrollProgress();

    // Инициализация текущего языка
    this.currentLanguage = this.translateService.currentLang || this.translateService.defaultLang || 'en';
  }

  private checkScrollPosition(): void {
    this.scrolled = window.pageYOffset < this.closeFromTopPx;
  }

  private updateScrollProgress(): void {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollableHeight = documentHeight - windowHeight;

    if (scrollableHeight > 0) {
      this.scrollProgress = (scrollTop / scrollableHeight) * 100;
    } else {
      this.scrollProgress = 0;
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    // Определяем, находится ли пользователь в верхней части страницы
    this.scrolled = window.pageYOffset < this.closeFromTopPx;

    // Обновляем прогресс-бар
    this.updateScrollProgress();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    const newWidth = event.target.innerWidth;
    this.getScreenWidth = newWidth;
    this.getScreenHeight = event.target.innerHeight;

    const wasMobile = this.mobileView;
    this.mobileView = newWidth <= 675;

    // Закрываем меню при переходе с мобильного на десктоп
    if (wasMobile && !this.mobileView && this.showMenu) {
      this.closeMenu();
    }
  }

  menuToggle(): void {
    this.showMenu = !this.showMenu;
    // Блокируем скролл когда меню открыто
    if (this.showMenu) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  closeMenu(): void {
    this.showMenu = false;
    document.body.style.overflow = '';
  }

  navigateTo(path: string, fragment: string): void {
    this.router.navigate([`/${path}`], { fragment: `${fragment}` });
    if (this.showMenu) {
      this.closeMenu();
    }
  }

  downloadCV(): void {
    const fileUrl =
      '../../../assets/cv/Azat Farmanyan - CV - Software enginner.pdf';
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = 'Azat Farmanyan - CV - Software enginner';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  socialLinksFolder = 'social-links-gray';

  linkedinImageSrc = `../../../assets/icons/${this.socialLinksFolder}/basil_linkedin-solid.svg`;
  githubImageSrc = `../../../assets/icons/${this.socialLinksFolder}/mdi_github.svg`;
  telegramImageSrc = `../../../assets/icons/${this.socialLinksFolder}/ic_baseline-telegram.svg`;
  discordImageSrc = `../../../assets/icons/${this.socialLinksFolder}/ic_baseline-discord.svg`;
  instagramImageSrc = `../../../assets/icons/${this.socialLinksFolder}/ri_instagram-fill.svg`;
  facebookImageSrc = `../../../assets/icons/${this.socialLinksFolder}/gg_facebook.svg`;

  onMouseEnter(platform: string) {
    this.updateImageSrc(platform, 'social-links-orange');
  }

  onMouseLeave(platform: string) {
    this.updateImageSrc(platform, 'social-links-gray');
  }
  private updateImageSrc(platform: string, folder: string) {
    switch (platform) {
      case 'linkedin':
        this.linkedinImageSrc = `../../../assets/icons/${folder}/basil_linkedin-solid.svg`;
        break;
      case 'github':
        this.githubImageSrc = `../../../assets/icons/${folder}/mdi_github.svg`;
        break;
      case 'telegram':
        this.telegramImageSrc = `../../../assets/icons/${folder}/ic_baseline-telegram.svg`;
        break;
      case 'discord':
        this.discordImageSrc = `../../../assets/icons/${folder}/ic_baseline-discord.svg`;
        break;
      case 'instagram':
        this.instagramImageSrc = `../../../assets/icons/${folder}/ri_instagram-fill.svg`;
        break;
      case 'facebook':
        this.facebookImageSrc = `../../../assets/icons/${folder}/gg_facebook.svg`;
        break;
    }
  }
}
