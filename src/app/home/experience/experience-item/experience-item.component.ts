import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ExperienceService } from 'src/app/services/experience.service';
import { Experience } from '../../../services/experience.service';

@Component({
  selector: 'app-experience-item',
  styleUrls: ['./experience-item.component.scss'],
  templateUrl: './experience-item.component.html',
})
export class ExperienceItemComponent implements OnInit, OnChanges {
  @Input({ required: true }) experience: Experience;
  @Input({ required: true }) isLast: boolean = false;

  experienceTxt = '';
  companyPage = '';

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    this.getexperienceDescription();
    this.getCompanyPage();
  }

  getexperienceDescription() {
    this.experienceTxt = this.experience.description.split('- ').join('</br>');

    // return this.experience.description.split('- ').join('</br>' + '-');
    // this.experience.description.split('');
  }

  getCompanyPage() {
    const shortLinkOfPage = this.experience.page.split('https://').join('');

    if (shortLinkOfPage.endsWith('/'))
      this.companyPage = shortLinkOfPage.slice(0, -1);
  }
}
