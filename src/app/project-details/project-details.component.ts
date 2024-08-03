import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { Project, ProjectsService } from '../services/projects.service';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Skill, SkillsService } from '../services/skills.service';
import { TranslateService } from '@ngx-translate/core';

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
  projectID: number;
  screenshots: string[] = [];

  tools: Skill[] = [];

  imagePath = '../../assets/images/';
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private projectsService: ProjectsService,
    private skillsService: SkillsService,
    private translate: TranslateService
  ) {}
  ngOnInit(): void {
    this.getPostIdFromRoute();
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

      const currentLang =
        this.translate.currentLang || this.translate.getDefaultLang();

      this.projectSub = this.projectsService
        .getProjectByIndex(currentLang, this.projectID)
        .subscribe((project) => {
          console.log(project);

          if (this.project === null) {
            // this.back();
          }

          this.project = project;
          console.log(this.project);

          if (this.project?.screenshots) {
            this.project.tools.forEach((tool) => {
              const toolRes = this.skillsService.getSkillByName(tool);
              if (toolRes) {
                this.tools.push(toolRes);
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
  }
}
