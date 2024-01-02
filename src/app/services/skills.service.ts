import { Injectable } from '@angular/core';

export interface Skill {
  name: string;
  img: string;
  website: string;
}

@Injectable({
  providedIn: 'root',
})
export class SkillsService {
  constructor() {}

  private skills: Skill[] = [
    {
      name: 'HTML',
      img: 'html.png',
      website: 'https://developer.mozilla.org/en-US/docs/Glossary/HTML5',
    },
    { name: 'CSS', img: 'css.png', website: 'https://www.w3.org/TR/CSS/#css' },
    { name: 'SCSS', img: 'SCSS.png', website: 'https://sass-lang.com/' },
    {
      name: 'JavaScript',
      img: 'javascript.png',
      website: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
    },
    {
      name: 'TypeScript',
      img: 'typescript.png',
      website: 'https://www.typescriptlang.org/',
    },
    { name: 'Angular', img: 'angular.png', website: 'https://angular.dev/' },
    { name: 'RxJs', img: 'rxjs.png', website: 'https://rxjs.dev/' },
    { name: 'Ionic', img: 'ionic.png', website: 'https://ionicframework.com/' },
    {
      name: 'DevExtreme',
      img: 'devextreme.png',
      website: 'https://js.devexpress.com/',
    },
    { name: 'GIT', img: 'git.png', website: 'https://git-scm.com/' },
    { name: 'GITHUB', img: 'github.png', website: 'https://github.com/' },
    {
      name: 'VS Code',
      img: 'vscode.png',
      website: 'https://code.visualstudio.com/',
    },
    {
      name: 'VisualStudio',
      img: 'visualstudio.png',
      website: 'https://visualstudio.microsoft.com/',
    },
    {
      name: 'Sublime',
      img: 'sublime.png',
      website: 'https://www.sublimetext.com/',
    },
    {
      name: 'Chrome DevTools',
      img: 'chrome.png',
      website: 'https://developer.chrome.com/docs/devtools',
    },
    { name: 'Figma', img: 'figma.png', website: 'https://www.figma.com/' },
    {
      name: 'Photoshop',
      img: 'photoshop.png',
      website: 'https://www.adobe.com/ru/products/photoshop.html',
    },
    {
      name: 'Illustrator',
      img: 'illustrator.png',
      website: 'https://www.adobe.com/products/illustrator.html',
    },
  ];

  getSkills() {
    return this.skills;
  }

  getSkillByName(skillName: string): Skill | undefined {
    return this.skills.find((skill) => skill.name === skillName);
  }
}
