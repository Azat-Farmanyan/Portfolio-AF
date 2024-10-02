import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Renderer2,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { Project, ProjectsService } from 'src/app/services/projects.service';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent
  implements OnInit, OnChanges, AfterViewInit, OnDestroy
{
  @Input() openedCardId: any;

  projects: Project[];
  projectsSubs: Subscription;
  languageSubs: Subscription;
  currentLanguage: string = this.languageService.activeLanguage();

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    public projectsService: ProjectsService,
    private translate: TranslateService,
    public languageService: LanguageService
  ) {}

  ngOnInit(): void {
    this.loadProjects();

    // console.log(this.currentLanguage);

    this.languageSubs = this.languageService.language$.subscribe((lang) => {
      this.currentLanguage = lang;
      this.loadProjects();
    });
  }

  ngOnChanges(): void {
    // console.log(this.openedCardId);
  }

  ngAfterViewInit() {
    // this.scrollToProjects();
  }

  loadProjects(): void {
    // console.log('loadProjects()');

    this.projectsSubs = this.projectsService
      .getProjects(this.languageService.activeLanguage())
      .subscribe((data) => {
        this.projects = data;
        // console.log(this.projects);
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

  ngOnDestroy(): void {
    if (this.projectsSubs) this.projectsSubs.unsubscribe();
    if (this.languageSubs) this.languageSubs.unsubscribe();
  }
}
