import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
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
  @Input({ required: true }) currentLang: string = '';

  experienceTxt = '';
  companyPage = '';
  experienceDuration = '';
  hasLogo = false;
  isExpanded = false;
  showReadMore = false;
  descriptionHeight = 0;
  readMoreText = '';
  readLessText = '';

  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    // Check if description needs "read more" after view init
    setTimeout(() => {
      this.checkDescriptionHeight();
    }, 100);
    this.loadTranslations();
  }

  loadTranslations() {
    this.translate.get('experience-page.read_more').subscribe((res: string) => {
      this.readMoreText = res;
    });
    this.translate.get('experience-page.read_less').subscribe((res: string) => {
      this.readLessText = res;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['experience']) {
      this.updateExperienceDetails();
    }
    if (changes['currentLang']) {
      this.loadTranslations();
    }
  }

  updateExperienceDetails() {
    this.getexperienceDescription();
    this.getCompanyPage();
    this.experienceDuration = this.calculateDuration(
      this.experience.date.from,
      this.experience.date.to
    );
    this.hasLogo = !!(this.experience.companyLogo && this.experience.companyLogo.trim() !== '');
  }

  getexperienceDescription() {
    this.experienceTxt = this.experience.description
      .split('- ')
      .join('</br>- ');

    // Добавляем конвертацию URL в теги <a>
    //  this.experienceTxt = this.experienceTxt.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank">$1</a>');
    this.experienceTxt = this.experienceTxt.replace(
      /(https?:\/\/[^\s]+)/g,
      '<a href="$1" target="_blank" style="text-decoration: underline;"> <b><u>$1</u></b>  </a>'
    );

    // return this.experience.description.split('- ').join('</br>' + '-');
    // this.experience.description.split('');
  }

  getCompanyPage() {
    const protocols = ['http://', 'https://'];

    for (const protocol of protocols) {
      if (this.experience.page.includes(protocol)) {
        let shortLinkOfPage = this.experience.page.replace(protocol, '');

        if (shortLinkOfPage.endsWith('/')) {
          shortLinkOfPage = shortLinkOfPage.slice(0, -1);
        }

        this.companyPage = shortLinkOfPage;
        break; // Выходим из цикла, если нашли подходящий протокол
      }
    }
  }

  calculateDuration(from: string, to: string): string {
    const monthNames: { [key: string]: number } = {
      // Английские месяцы
      January: 0,
      February: 1,
      March: 2,
      April: 3,
      May: 4,
      June: 5,
      July: 6,
      August: 7,
      September: 8,
      October: 9,
      November: 10,
      December: 11,
      // Русские месяцы
      Январь: 0,
      Февраль: 1,
      Март: 2,
      Апрель: 3,
      Май: 4,
      Июнь: 5,
      Июль: 6,
      Август: 7,
      Сентябрь: 8,
      Октябрь: 9,
      Ноябрь: 10,
      Декабрь: 11,
    };

    function parseDate(dateStr: string): { date: Date; language: string } {
      const monthStr = dateStr.split(' ')[0];
      const yearStr = dateStr.split(' ')[1];
      const month = monthNames[monthStr];
      const year = parseInt(yearStr, 10);
      const language = Object.keys(monthNames).includes(monthStr)
        ? [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
          ].includes(monthStr)
          ? 'en'
          : 'ru'
        : 'unknown';
      return { date: new Date(year, month), language };
    }

    const fromDate = parseDate(from);
    let toDate: { date: Date; language: string };

    if (to.toLowerCase() === 'till now' || to.toLowerCase() === 'до сих пор') {
      toDate = { date: new Date(), language: fromDate.language }; // Использовать текущую дату и язык входных данных
    } else {
      toDate = parseDate(to);
    }

    const fromYear = fromDate.date.getFullYear();
    const fromMonth = fromDate.date.getMonth();
    const toYear = toDate.date.getFullYear();
    const toMonth = toDate.date.getMonth();

    let yearsDiff = toYear - fromYear;
    let monthsDiff = toMonth - fromMonth;

    if (monthsDiff < 0) {
      yearsDiff--;
      monthsDiff += 12;
    }

    // Конструируем строку продолжительности в зависимости от языка
    let duration = '';
    if (yearsDiff > 0) {
      if (fromDate.language === 'en') {
        duration += `${yearsDiff} year${yearsDiff > 1 ? 's' : ''}`;
      } else {
        duration += `${yearsDiff} год${yearsDiff > 1 ? 'а' : ''}${
          yearsDiff > 4 ? 'ов' : ''
        }`;
      }
    }
    if (monthsDiff > 0) {
      if (fromDate.language === 'en') {
        duration += `${duration.length > 0 ? ', ' : ''}${monthsDiff} month${
          monthsDiff > 1 ? 's' : ''
        }`;
      } else {
        duration += `${duration.length > 0 ? ' ' : ''}${monthsDiff} месяц${
          monthsDiff > 1 && monthsDiff < 5 ? 'а' : ''
        }${monthsDiff >= 5 ? 'ев' : ''}`;
      }
    }

    return duration;
  }

  toggleDescription() {
    this.isExpanded = !this.isExpanded;
  }

  checkDescriptionHeight() {
    // Always show read more button to allow expanding/collapsing
    this.showReadMore = true;
  }
}
