import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Renderer2,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { Project, ProjectsService } from 'src/app/services/projects.service';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent
  implements OnInit, OnChanges, AfterViewInit, OnDestroy
{
  @Input() openedCardId: any;

  projects: Project[];
  projectsSubs: Subscription;
  languageSubs: Subscription;
  currentLanguage: string = this.languageService.activeLanguage();

  @ViewChild('tableContainer') tableContainer!: ElementRef;

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    public projectsService: ProjectsService,
    private translate: TranslateService,
    public languageService: LanguageService
  ) {}

  ngOnInit(): void {
    this.loadProjects();

    // console.log(this.currentLanguage);

    this.languageSubs = this.languageService.language$.subscribe((lang) => {
      this.currentLanguage = lang;
      this.loadProjects();
    });
  }

  ngOnChanges(): void {
    // console.log(this.openedCardId);
  }

  ngAfterViewInit() {
    // this.scrollToProjects();

    // Получаем сохранённый ID элемента
    const scrollId = localStorage.getItem('scrollId');

    if (scrollId) {
      // Максимальное количество попыток
      const maxAttempts = 50;
      let attemptCount = 0;

      // Функция для попытки получить элемент и прокрутки
      const tryScroll = () => {
        // Если количество попыток превышает лимит, выходим
        if (attemptCount >= maxAttempts) {
          return;
        }

        // Находим элемент в таблице по ID
        const targetElement = this.tableContainer.nativeElement.querySelector(
          `[data-id="${scrollId}"]`
        );

        // Если элемент найден, прокручиваем к нему
        if (targetElement) {
          setTimeout(() => {
            // Прокручиваем к элементу
            targetElement.scrollIntoView({
              behavior: 'instant',
              block: 'center',
            });

            // Убираем сохранённый ID после прокрутки
            localStorage.removeItem('scrollId');

            // Добавляем стиль для плавного изменения фона после прокрутки
            setTimeout(() => {
              targetElement.style.transition =
                'background-color 0.5s ease-in-out'; // Плавное изменение фона
              targetElement.style.backgroundColor = 'rgba(0, 0, 0, 0.1)'; // Полупрозрачный чёрный

              // Убираем затемнение через 1 секунду
              setTimeout(() => {
                targetElement.style.backgroundColor = ''; // Убираем фон
              }, 1000);
            }, 500); // Задержка перед изменением фона, чтобы прокрутка уже завершилась
          }, 200);
        } else {
          // Если элемент ещё не найден, пробуем снова через 200ms
          attemptCount++;

          setTimeout(tryScroll, 200);
        }
      };

      // Запускаем функцию для первой попытки
      tryScroll();
    }
  }

  loadProjects(): void {
    // console.log('loadProjects()');

    this.projectsSubs = this.projectsService
      .getProjects(this.languageService.activeLanguage())
      .subscribe((data) => {
        this.projects = data;
        // console.log(this.projects);
      });
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

  ngOnDestroy(): void {
    if (this.projectsSubs) this.projectsSubs.unsubscribe();
    if (this.languageSubs) this.languageSubs.unsubscribe();
  }
}
