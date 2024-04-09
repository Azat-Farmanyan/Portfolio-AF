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
        style({ height: 0, overflow: 'hidden' }),
        query('.menu-item', [
          style({ opacity: 0, transform: 'translateY(-50px)' }),
        ]),
        sequence([
          animate('200ms', style({ height: '*' })),
          query('.menu-item', [
            stagger(-50, [
              animate('400ms ease', style({ opacity: 1, transform: 'none' })),
            ]),
          ]),
        ]),
      ]),

      transition(':leave', [
        style({ height: '*', overflow: 'hidden' }),
        query('.menu-item', [style({ opacity: 1, transform: 'none' })]),
        sequence([
          query('.menu-item', [
            stagger(50, [
              animate(
                '400ms ease',
                style({ opacity: 0, transform: 'translateY(-50px)' })
              ),
            ]),
          ]),
          animate('200ms', style({ height: 0 })),
        ]),
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
        style({ opacity: 0, transform: 'translateY(-80px)' }),
        animate('400ms', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
      transition(':leave', [
        animate('400ms', style({ opacity: 0, transform: 'translateY(-80px)' })),
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
  isMouseNearTop = true;
  scrolled = false;
  mobileView = false;

  public getScreenWidth!: number;
  public getScreenHeight!: number;

  constructor(private router: Router) {
    this.scrolled = window.pageYOffset < 80;
  }

  ngOnInit() {
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    const mouseY = event.clientY;

    mouseY <= 120
      ? (this.isMouseNearTop = true)
      : (this.isMouseNearTop = false);
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.scrolled = window.pageYOffset < this.closeFromTopPx;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (event.target.innerWidth > 600) {
      this.closeMenu();
      this.mobileView = false;
    } else {
      this.mobileView = true;
    }
  }

  menuToggle() {
    this.showMenu = !this.showMenu;
  }
  closeMenu() {
    this.showMenu = false;
  }

  navigateTo(path: string, fragment: string) {
    this.router.navigate([`/${path}`], { fragment: `${fragment}` });
    if (this.showMenu) this.closeMenu();
  }

  downloadCV(): void {
    return;
    const fileUrl =
      '../../../assets/cv/Angular Developer - Azat Farmanyan - ENG.pdf';
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = 'Angular Developer - Azat Farmanyan';
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
