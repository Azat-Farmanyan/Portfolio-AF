import { JsonPipe, NgStyle } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ProjectCommertial } from 'src/app/services/projects.service';

@Component({
  selector: 'app-project-card-commertial-v1',
  standalone: true,
  imports: [JsonPipe, TranslateModule, NgStyle],
  templateUrl: './project-card-commertial-v1.component.html',
  styleUrls: ['./project-card-commertial-v1.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectCardCommertialV1Component {
  @Input({
    required: true,
  })
  projectData: ProjectCommertial;

  public screenshotsFolderPath = '../../../../assets/commertial_projects/';

  private getImagePath(imageName: string): string {
    return `${this.screenshotsFolderPath}${imageName}`;
  }
}
