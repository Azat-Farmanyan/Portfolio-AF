import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { Project, ProjectsService } from '../services/projects.service';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss'],
})
export class ProjectDetailsComponent implements OnInit {
  project: Project | null;
  showInstruction: boolean = false;

  routeSub: Subscription;
  projectID: number;
  screenshots: string[] = [];

  imagePath = '../../assets/images/';
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private projectsService: ProjectsService
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
      // console.log(this.projectID);
      this.project = this.projectsService.getProjectById(this.projectID);
      if (this.project?.screenshots) {
        const banner = this.project.banner;
        this.setActiveImage(banner);
        this.screenshots = this.project.screenshots;
        // console.log(banner);

        if (banner.length === 0) {
          this.setActiveImage(this.screenshots[0]);
        }
      }

      if (this.project === null) this.back();
      // console.log(this.project);
    });
  }
  back() {
    this.router.navigate(['/home'], { fragment: 'projects' });
  }

  setActiveImage(imageName: string) {
    this.imagePath = '../../assets/images/';
    this.imagePath += imageName;
  }

  ngOnDestroy(): void {
    if (this.routeSub) this.routeSub.unsubscribe();
  }
}
