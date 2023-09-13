import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  Renderer2,
  SimpleChanges,
} from '@angular/core';
import { ProjectsService } from 'src/app/services/projects.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() openedCardId: any;

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    public projectsService: ProjectsService
  ) {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    console.log(this.openedCardId);
  }

  ngAfterViewInit() {
    // this.scrollToProjects();
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
