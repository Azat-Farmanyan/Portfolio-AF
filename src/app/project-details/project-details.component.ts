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

  routeSub: Subscription;
  projectID: number;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private projectsService: ProjectsService
  ) {}
  ngOnInit(): void {
    this.getPostIdFromRoute();
  }

  getPostIdFromRoute() {
    this.routeSub = this.route.params.subscribe((params) => {
      this.projectID = +params['id'];
      console.log(this.projectID);
      this.project = this.projectsService.getProjectById(this.projectID);
      if (this.project === null) this.back();
      console.log(this.project);
    });
  }
  back() {
    this.router.navigate(['/home'], { fragment: 'projects' });
  }
  ngOnDestroy(): void {
    if (this.routeSub) this.routeSub.unsubscribe();
  }
}
