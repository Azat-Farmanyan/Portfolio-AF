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
    this.scrolled = window.pageYOffset < 80;
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
}
