import { Injectable } from '@angular/core';

export interface Project {
  id: number;
  title: string;
  description: string;
  img: string;
  screenshots?: string[];
  tools: string[];
  seeLive: string;
  sourceCodeUrl: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  constructor() {}

  projects: Project[] = [
    {
      id: 1,
      title: 'Project Management App',
      description:
        'Project management system is an application that helps an individual in a team or group of developers achieve their goals. There are many competitors on the market for my application. The main competitors are the following: Trello, Jira, Redmine, Bitrix24, Yandex Tracker, Asana, GanttPro, Github projects.',
      img: 'proj-man-system.jpg',
      screenshots: [
        '../../../../assets/screenshots/pms1.png',
        '../../../../assets/screenshots/pms2.png',
        '../../../../assets/screenshots/pms3.png',
        '../../../../assets/screenshots/pms4.png',
      ],
      tools: ['Angular', 'html', 'CSS', 'JavaScript'],
      // tools: [
      //   this.skill('Angular'),
      //   this.skill('html'),
      //   this.skill('CSS'),
      //   this.skill('JavaScript'),
      //   this.skill('Sass'),
      //   this.skill('TypeScript'),

      //   this.instrument('vscode'),
      //   this.instrument('Adobe Photoshop'),
      //   this.instrument('illustrator'),
      //   this.instrument('Figma'),
      // ],
      seeLive: 'https://fascinating-douhua-c23dc0.netlify.app/',
      sourceCodeUrl: 'https://github.com/Azat-Farmanyan/rs-front-azat',
    },
  ];

  getProjectById(id: number): Project | null {
    const emptyProject = {
      id: 0,
      title: '',
      description: '',
      img: '',
      screenshots: [],
      tools: [],
      seeLive: '',
      sourceCodeUrl: '',
    };
    const gotProject = this.projects.find((project) => project.id === id);

    return gotProject ?? null;
  }
}
