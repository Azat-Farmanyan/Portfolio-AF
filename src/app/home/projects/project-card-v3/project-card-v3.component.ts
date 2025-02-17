import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Project } from 'src/app/services/projects.service';
import { SharedModule } from '../../../shared/shared.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-card-v3',
  standalone: true,
  imports: [TranslateModule, SharedModule],
  templateUrl: './project-card-v3.component.html',
  styleUrls: ['./project-card-v3.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectCardV3Component {
  @Input({
    required: true,
  })
  projectData: Project;

  private router = inject(Router);

  public screenshotsFolderPath = '../../../../assets/screenshots/';

  openDetails(id: number) {
    localStorage.setItem('scrollId', String(id));
    this.router.navigate([`details/${id}`]);
  }
}
