import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  constructor(private router: Router) {}

  navigateTo(path: string, fragment: string) {
    this.router.navigate([`/${path}`], { fragment: `${fragment}` });
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
}
