import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  scrollTop = false;

  @HostListener('window:scroll', ['$event'])
  onWindowsScroll(event: Event) {
    const scrollTop =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop;
    if (scrollTop === 0) {
      this.scrollTop = true;
    } else {
      this.scrollTop = false;
    }
  }
}
