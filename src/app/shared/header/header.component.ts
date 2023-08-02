import {
  trigger,
  transition,
  style,
  animate,
  query,
  sequence,
  stagger,
} from '@angular/animations';
import { Component, HostListener } from '@angular/core';

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
  ],
})
export class HeaderComponent {
  showMenu = false;

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
