import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  randomSkillNumber = 0;

  ngOnInit(): void {
    setInterval(() => {
      this.randomSkillNumber = this.getRandomNumber(this.skills.length);
    }, 2000);
  }
  skills: String[] = [
    'HTML',
    'CSS',
    'JavaScript',
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

  getRandomNumber(max: number) {
    // Generate a random floating-point number between 0 (inclusive) and 1 (exclusive)
    const randomFloat = Math.random();

    // Scale the randomFloat to be between 0 and max (exclusive)
    const randomNumber = Math.floor(randomFloat * max);

    return randomNumber;
  }
}
