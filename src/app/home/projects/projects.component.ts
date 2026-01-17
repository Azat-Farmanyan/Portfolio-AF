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
import { Subject, Subscription, takeUntil } from 'rxjs';
import {
  Project,
  ProjectCommertial,
  ProjectsService,
} from 'src/app/services/projects.service';
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

  private destroy$ = new Subject<void>();

  projects: Project[];
  projectsCommertial: ProjectCommertial[];
  projectsSubs: Subscription;
  languageSubs: Subscription;
  currentLanguage: string = this.languageService.activeLanguage();

  @ViewChild('tableContainer') tableContainer!: ElementRef;
  @ViewChild('projectsContainer', { static: false })
  projectsContainer!: ElementRef;
  @ViewChild('commertialProjectsContainer', { static: false })
  commertialProjectsContainer!: ElementRef;

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

    this.languageSubs = this.languageService.language$
      .pipe(takeUntil(this.destroy$))
      .subscribe((lang) => {
        this.currentLanguage = lang;
        this.loadProjects();
      });
  }

  ngOnChanges(): void {
    // console.log(this.openedCardId);
  }

  ngAfterViewInit() {
    // Позиция будет восстановлена после загрузки проектов
  }

  private restoreScrollPosition() {
    const projectType = localStorage.getItem('projectType');
    const scrollId = localStorage.getItem('scrollId');

    if (!projectType || !scrollId) {
      return;
    }

    // Восстанавливаем позицию скролла страницы
    const pageScrollTop = localStorage.getItem('pageScrollTop');
    if (pageScrollTop) {
      window.scrollTo({
        top: parseInt(pageScrollTop, 10),
        behavior: 'instant'
      });
    }

    // Восстанавливаем позицию скролла контейнера проектов
    if (projectType === 'personal' && this.projectsContainer) {
      const scrollLeft = localStorage.getItem('personalProjectsScrollLeft');
      if (scrollLeft) {
        this.projectsContainer.nativeElement.scrollLeft = parseInt(scrollLeft, 10);
      }
    } else if (projectType === 'commercial' && this.commertialProjectsContainer) {
      const scrollLeft = localStorage.getItem('commertialProjectsScrollLeft');
      if (scrollLeft) {
        this.commertialProjectsContainer.nativeElement.scrollLeft = parseInt(scrollLeft, 10);
      }
    }

    // Очищаем сохранённые данные после восстановления
    setTimeout(() => {
      localStorage.removeItem('projectType');
      localStorage.removeItem('scrollId');
      localStorage.removeItem('personalProjectsScrollLeft');
      localStorage.removeItem('commertialProjectsScrollLeft');
      localStorage.removeItem('pageScrollTop');
    }, 500);
  }

  oldScrollCode() {
    // Старый код (не используется)
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
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.projects = this.sortProjectsByIds(data, [20, 18, 15, 6, 9, 3, 2]);
        // Восстанавливаем позицию после загрузки проектов
        setTimeout(() => this.restoreScrollPosition(), 300);
      });

    this.projectsService
      .getCommertialProjects(this.languageService.activeLanguage())
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.projectsCommertial = data;
      });
  }

  private sortProjectsByIds(projects: any[], ids: number[]): any[] {
    return projects.sort((a, b) => {
      const indexA = ids.indexOf(a.id);
      const indexB = ids.indexOf(b.id);

      // Если оба id в массиве, сортируем их по порядку
      if (indexA !== -1 && indexB !== -1) {
        return indexA - indexB;
      }

      // Если только один из элементов в массиве ids, ставим его выше
      if (indexA !== -1) {
        return -1;
      }
      if (indexB !== -1) {
        return 1;
      }

      // Если ни один id не в массиве, оставляем их в исходном порядке
      return 0;
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

  onWheel(event: WheelEvent): void {
    const container = event.currentTarget as HTMLElement;

    // Определяем, может ли контейнер скроллиться горизонтально
    const canScrollHorizontally = container.scrollWidth > container.clientWidth;

    if (!canScrollHorizontally) {
      // Контейнер не может скроллиться - пропускаем событие
      return;
    }

    // Преобразуем вертикальный скролл в горизонтальный для этого контейнера
    // Также учитываем, если пользователь скроллит горизонтально напрямую
    let scrollAmount = event.deltaX;

    // Если deltaX отсутствует или мал, используем deltaY для горизонтального скролла
    if (Math.abs(event.deltaX) < Math.abs(event.deltaY)) {
      scrollAmount = event.deltaY;
    }

    // Определяем текущее положение прокрутки
    const maxScrollLeft = container.scrollWidth - container.clientWidth;
    const currentScrollLeft = container.scrollLeft;

    // Проверяем, достигнут ли край контейнера (с небольшой погрешностью)
    const threshold = 5;
    const isAtStart = currentScrollLeft <= threshold;
    const isAtEnd = currentScrollLeft >= maxScrollLeft - threshold;

    // Если прокручивать больше некуда в направлении скролла, разрешаем дефолтное поведение
    if ((scrollAmount > 0 && isAtEnd) || (scrollAmount < 0 && isAtStart)) {
      return; // Не блокируем событие, страница будет скроллиться вертикально
    }

    // Если еще можно скроллить внутри контейнера, блокируем дефолтное поведение
    event.preventDefault();
    event.stopPropagation();

    // Плавная прокрутка с использованием smooth behavior
    container.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
  }

  scrollLeft(commertial = false): void {
    const container = commertial
      ? this.commertialProjectsContainer
      : this.projectsContainer;

    if (container) {
      const element = container.nativeElement;
      const cardWidth = commertial ? 530 : 430; // 500px карточка + 30px gap

      element.scrollBy({
        left: -cardWidth,
        behavior: 'smooth',
      });
    }
  }

  scrollRight(commertial = false): void {
    const container = commertial
      ? this.commertialProjectsContainer
      : this.projectsContainer;

    if (container) {
      const element = container.nativeElement;
      const cardWidth = commertial ? 530 : 430; // 500px карточка + 30px gap

      element.scrollBy({
        left: cardWidth,
        behavior: 'smooth',
      });
    }
  }

  ngOnDestroy(): void {
    if (this.projectsSubs) this.projectsSubs.unsubscribe();
    if (this.languageSubs) this.languageSubs.unsubscribe();

    this.destroy$.next();
    this.destroy$.complete();
  }
}
