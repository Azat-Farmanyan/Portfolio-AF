import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent {
  skills: String[] = [
    'HTML',
    'CSS',
    'JavaScript',
    'TypeScript',
    'TypeScript',
    'Angular',
    'VS Code',
    'VisualStudio',
    'Sublime',
    'Chrome DevTools',
    'Figma',
    'Photoshop',
    'Illustrator',
    'GIT',
    'GITHUB',
    'DevExtreme',
    'DevExpress',
  ];
}
