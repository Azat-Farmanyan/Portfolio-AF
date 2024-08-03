import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Renderer2,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Project, ProjectsService } from 'src/app/services/projects.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() openedCardId: any;

  projects: Project[];

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    public projectsService: ProjectsService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  ngOnChanges(): void {
    // console.log(this.openedCardId);
  }

  ngAfterViewInit() {
    // this.scrollToProjects();
  }

  loadProjects(): void {
    const currentLang =
      this.translate.currentLang || this.translate.getDefaultLang();
    this.projectsService.getProjects(currentLang).subscribe((data) => {
      this.projects = data;
      console.log(this.projects);
    });
  }

  scrollToProjects() {
    const projectsElement = this.el.nativeElement.querySelector(
      `#${this.openedCardId}`
    );

    if (projectsElement) {
      this.renderer.setProperty(
        document.documentElement,
        'scrollTop',
        projectsElement.offsetTop
      );
    }
  }
}
