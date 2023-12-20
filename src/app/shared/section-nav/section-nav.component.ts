import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-section-nav',
  templateUrl: './section-nav.component.html',
  styleUrls: ['./section-nav.component.scss'],
})
export class SectionNavComponent {
  @Input() activeSectionId: number = 0;
  constructor(private router: Router) {}

  navigateTo(path: string, fragment: string) {
    this.router.navigate([`/${path}`], { fragment: `${fragment}` });
  }
}
