import { Injectable } from '@angular/core';

export interface Skill {
  name: string;
  img: string;
}

@Injectable({
  providedIn: 'root',
})
export class SkillsService {
  constructor() {}

  private skills: Skill[] = [
    { name: 'HTML', img: 'html.png' },
    { name: 'CSS', img: 'css.png' },
    { name: 'JavaScript', img: 'javascript.png' },
    { name: 'TypeScript', img: 'typescript.png' },
    { name: 'Angular', img: 'angular.png' },
    { name: 'RxJs', img: 'rxjs.png' },
    { name: 'Ionic', img: 'ionic.png' },
    { name: 'DevExtreme', img: 'devextreme.png' },
    { name: 'GIT', img: 'git.png' },
    { name: 'GITHUB', img: 'github.png' },
    { name: 'VS Code', img: 'vscode.png' },
    { name: 'VisualStudio', img: 'visualstudio.png' },
    { name: 'Sublime', img: 'sublime.png' },
    { name: 'Chrome DevTools', img: 'chrome.png' },
    { name: 'Figma', img: 'figma.png' },
    { name: 'Photoshop', img: 'photoshop.png' },
    { name: 'Illustrator', img: 'illustrator.png' },
  ];

  getSkills() {
    return this.skills;
  }

  getSkillByName(skillName: string): Skill | undefined {
    return this.skills.find((skill) => skill.name === skillName);
  }
}
