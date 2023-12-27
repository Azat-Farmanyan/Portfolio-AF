import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from 'src/app/services/projects.service';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss'],
})
export class ProjectCardComponent implements OnInit {
  @Input() project: Project;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // this.activeSlideImg = this.project.screenshots[activeSlide];
  }

  openDetails(id: number) {
    this.router.navigate([`details/${id}`]);
  }

  log() {
    console.log('pic is loaded');
  }
}
