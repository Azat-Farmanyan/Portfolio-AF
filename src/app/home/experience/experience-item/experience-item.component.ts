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
  experienceDuration = '';

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    this.getexperienceDescription();
    this.getCompanyPage();
    this.experienceDuration = this.calculateDuration(
      this.experience.date.from,
      this.experience.date.to
    );
  }

  getexperienceDescription() {
    this.experienceTxt = this.experience.description.split('- ').join('</br>- ');

     // Добавляем конвертацию URL в теги <a>
    //  this.experienceTxt = this.experienceTxt.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank">$1</a>');
     this.experienceTxt = this.experienceTxt.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" style="text-decoration: underline;"> <b><u>$1</u></b>  </a>');

    // return this.experience.description.split('- ').join('</br>' + '-');
    // this.experience.description.split('');
  }

  getCompanyPage() {
    if (this.experience.page.includes('https://')) {
      const shortLinkOfPage = this.experience.page.split('https://').join('');

      if (shortLinkOfPage.endsWith('/')) {
        this.companyPage = shortLinkOfPage.slice(0, -1);
      }
    }
  }

  calculateDuration(from: string, to: string): string {
    const fromDate = new Date(from);
    let toDate: Date;

    if (to.toLowerCase() === 'till now') {
      toDate = new Date(); // Use current date if "till now" is provided
    } else {
      toDate = new Date(to);
    }

    const fromYear = fromDate.getFullYear();
    const fromMonth = fromDate.getMonth();
    const toYear = toDate.getFullYear();
    const toMonth = toDate.getMonth();

    let yearsDiff = toYear - fromYear;
    let monthsDiff = toMonth - fromMonth;

    if (monthsDiff < 0) {
      yearsDiff--;
      monthsDiff += 12;
    }

    // Construct the duration string
    let duration = '';
    if (yearsDiff > 0) {
      duration += `${yearsDiff} year${yearsDiff > 1 ? 's' : ''}`;
    }
    if (monthsDiff > 0) {
      duration += `${duration.length > 0 ? ', ' : ''}${monthsDiff} month${
        monthsDiff > 1 ? 's' : ''
      }`;
    }

    return duration;
  }
}
