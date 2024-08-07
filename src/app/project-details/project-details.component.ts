import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { Project, ProjectsService } from '../services/projects.service';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Skill, SkillsService } from '../services/skills.service';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss'],
})
export class ProjectDetailsComponent implements OnInit {
  project: Project | null;
  showInstruction: boolean = false;

  private routeSub: Subscription;
  private projectSub: Subscription;
  private languageSubs: Subscription;

  projectID: number;
  screenshots: string[] = [];
  currentLanguage: string = this.languageService.activeLanguage();

  tools: Skill[] = [];

  imagePath = '../../assets/images/';
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private projectsService: ProjectsService,
    private skillsService: SkillsService,
    private translate: TranslateService,
    public languageService: LanguageService
  ) {}

  ngOnInit(): void {
    this.languageSubs = this.languageService.language$.subscribe((lang) => {
      this.currentLanguage = lang;
      // this.getProject(+params['id']);

      this.getPostIdFromRoute();
    });
  }

  showInstructionModal() {
    if (this.project) {
      if (this.project.seeLive.includes('netlify')) {
        this.showInstruction = true;
      } else {
        // console.log(this.project.seeLive);

        window.open(this.project.seeLive, '_blank');
      }
    }

    // project.seeLive
  }

  getPostIdFromRoute() {
    this.routeSub = this.route.params.subscribe((params) => {
      this.projectID = +params['id'];

      this.getProject(+params['id']);
    });
  }
  getProject(projectID: number) {
    this.projectSub = this.projectsService
      .getProjectById(this.currentLanguage, projectID)
      .subscribe((project) => {
        console.log(project);

        if (this.project === null) {
          this.back();
        }

        this.project = project;

        if (this.project?.screenshots) {
          this.project.tools.forEach((tool) => {
            const toolRes = this.skillsService.getSkillByName(tool);

            if (toolRes) {
              if (!this.tools.includes(toolRes)) this.tools.push(toolRes);
            }
          });
          const banner = this.project.banner;
          this.setActiveImage(banner);
          this.screenshots = this.project.screenshots;

          if (banner.length === 0) {
            this.setActiveImage(this.screenshots[0]);
          }
        }
      });
  }

  back() {
    this.router.navigate(['/home'], { fragment: 'projects' });
  }

  setActiveImage(imageName: string) {
    this.imagePath = '../../assets/screenshots/';
    this.imagePath += imageName;
  }

  ngOnDestroy(): void {
    if (this.routeSub) this.routeSub.unsubscribe();
    if (this.projectSub) this.projectSub.unsubscribe();
    if (this.languageSubs) this.languageSubs.unsubscribe();
  }
}
