import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Project } from 'src/app/services/projects.service';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss'],
})
export class ProjectCardComponent implements OnInit {
  @Input() project: Project;
  seeMoreText = '';

  constructor(
    private router: Router,
    private translate: TranslateService
  ) {
    this.loadTranslations();
    this.translate.onLangChange.subscribe(() => {
      this.loadTranslations();
    });
  }

  loadTranslations() {
    this.translate.get('project-card.see_more').subscribe((res: string) => {
      this.seeMoreText = res;
    });
  }

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
