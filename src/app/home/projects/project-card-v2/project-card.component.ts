import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';
import { Project } from 'src/app/services/projects.service';
import { Skill } from 'src/app/services/skills.service';
import { SkillsService } from '../../../services/skills.service';

@Component({
  selector: 'app-project-card-v2',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss'],
})
export class ProjectCardComponentV2 implements OnInit, OnChanges {
  @Input() project: Project;

  tools: Skill[] = [];
  cardHovered: boolean = false;
  imageHeight: number = 298;
  descriptionLength = 10;

  private screenshotsFolderPath = '../../../../assets/screenshots/';

  constructor(private router: Router, private skillsService: SkillsService) {}

  ngOnInit(): void {
    this.setImagePaths();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['project']) {
      this.setImagePaths();
      this.getTools();
    }
  }
  openDetails(id: number) {
    localStorage.setItem('scrollId', String(id));
    this.router.navigate([`details/${id}`]);
  }

  getTools() {
    this.project.tools.forEach((tool) => {
      const toolItem = this.skillsService.getSkillByName(tool);
      if (toolItem) this.tools.push(toolItem);
    });

    // console.log(this.tools);
  }

  onMouseEnter() {
    this.cardHovered = true;
    this.imageHeight = 500;
    this.descriptionLength = 40;
  }
  onMouseLeave() {
    this.cardHovered = false;
    this.imageHeight = 298;
    this.descriptionLength = 10;
  }

  private setImagePaths() {
    if (this.project) {
      this.project.banner = this.getImagePath(this.project.banner);
      this.project.bannerSmall = this.project.bannerSmall
        ? this.getImagePath(this.project.bannerSmall)
        : undefined;
      this.project.screenshots = this.project.screenshots
        ? this.project.screenshots.map((name) => this.getImagePath(name))
        : [];
    }
  }

  private getImagePath(imageName: string): string {
    return `${this.screenshotsFolderPath}${imageName}`;
  }
}
