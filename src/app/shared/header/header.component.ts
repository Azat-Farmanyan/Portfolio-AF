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
  HostListener,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-header',
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
  ],
})
export class HeaderComponent implements OnInit, OnChanges {
  @Input() scrollTop: boolean = false;
  showMenu = false;

  public getScreenWidth!: number;
  public getScreenHeight!: number;

  ngOnInit() {
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;
  }
  ngOnChanges(): void {
    // console.log(this.scrollTop);
  }

  menuToggle() {
    this.showMenu = !this.showMenu;
  }
  closeMenu() {
    this.showMenu = false;
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (event.target.innerWidth > 600) {
      this.closeMenu();
    }
  }
}
