import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  AfterViewInit,
  OnDestroy,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ExperienceService } from 'src/app/services/experience.service';
import { Experience } from '../../../services/experience.service';

@Component({
  selector: 'app-experience-item',
  styleUrls: ['./experience-item.component.scss'],
  templateUrl: './experience-item.component.html',
})
export class ExperienceItemComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  @Input({ required: true }) experience: Experience;
  @Input({ required: true }) isLast: boolean = false;
  @Input({ required: true }) currentLang: string = '';
  @ViewChild('experienceCard', { static: false }) experienceCard!: ElementRef;

  experienceTxt = '';
  experienceItems: string[] = [];
  companyPage = '';
  experienceDuration = '';
  hasLogo = false;
  isExpanded = false;
  showReadMore = false;
  descriptionHeight = 0;
  readMoreText = '';
  readLessText = '';
  private intersectionObserver?: IntersectionObserver;

  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    // Check if description needs "read more" after view init
    setTimeout(() => {
      this.checkDescriptionHeight();
    }, 100);
    this.loadTranslations();
    this.updateExperienceDetails();
  }

  ngAfterViewInit(): void {
    this.setupScrollAnimation();
  }

  ngOnDestroy(): void {
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }
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
    // Разбиваем описание на отдельные пункты
    const items = this.experience.description
      .split('- ')
      .filter(item => item.trim() !== '')
      .map(item => item.trim());

    // Обрабатываем каждый пункт: конвертируем URL в теги <a>
    this.experienceItems = items.map(item => {
      return item.replace(
        /(https?:\/\/[^\s]+)/g,
        '<a href="$1" target="_blank" style="text-decoration: underline;"> <b><u>$1</u></b>  </a>'
      );
    });

    // Для обратной совместимости оставляем старый формат
    this.experienceTxt = this.experience.description
      .split('- ')
      .join('</br>- ');

    this.experienceTxt = this.experienceTxt.replace(
      /(https?:\/\/[^\s]+)/g,
      '<a href="$1" target="_blank" style="text-decoration: underline;"> <b><u>$1</u></b>  </a>'
    );
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
    // Показываем кнопку, если пунктов больше 3
    this.showReadMore = this.experienceItems.length > 3;
  }

  private setupScrollAnimation(): void {
    if (typeof IntersectionObserver === 'undefined') {
      // Fallback для браузеров без поддержки IntersectionObserver
      setTimeout(() => {
        if (this.experienceCard) {
          this.experienceCard.nativeElement.classList.add('visible');
        }
      }, 100);
      return;
    }

    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15 // Срабатывает, когда 15% элемента видно
    };

    this.intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Отключаем наблюдение после появления, чтобы анимация не повторялась
          this.intersectionObserver?.unobserve(entry.target);
        }
      });
    }, options);

    // Наблюдаем за карточкой после небольшой задержки, чтобы DOM был готов
    setTimeout(() => {
      if (this.experienceCard) {
        const card = this.experienceCard.nativeElement;
        // Проверяем, видна ли карточка уже при загрузке
        const rect = card.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

        if (isVisible) {
          // Если карточка уже видна, добавляем класс с небольшой задержкой
          setTimeout(() => {
            card.classList.add('visible');
          }, 100);
        } else {
          // Иначе начинаем наблюдение
          this.intersectionObserver?.observe(card);
        }
      }
    }, 100);
  }
}
