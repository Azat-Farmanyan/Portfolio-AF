import { Injectable, signal, effect } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly THEME_KEY = 'theme-preference';
  private readonly DARK_THEME_CLASS = 'dark-theme';

  // Signal для отслеживания текущей темы
  isDarkMode = signal<boolean>(this.getInitialTheme());

  constructor() {
    // Применяем тему при изменении signal
    effect(() => {
      this.applyTheme(this.isDarkMode());
    });

    // Инициализируем тему при загрузке
    this.applyTheme(this.isDarkMode());
  }

  /**
   * Получает начальную тему из localStorage или системных настроек
   */
  private getInitialTheme(): boolean {
    const savedTheme = localStorage.getItem(this.THEME_KEY);
    if (savedTheme !== null) {
      return savedTheme === 'dark';
    }

    // Проверяем системные настройки
    if (window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    return false;
  }

  /**
   * Переключает тему
   */
  toggleTheme(): void {
    this.isDarkMode.set(!this.isDarkMode());
    this.saveTheme();
  }

  /**
   * Устанавливает тему
   */
  setTheme(isDark: boolean): void {
    this.isDarkMode.set(isDark);
    this.saveTheme();
  }

  /**
   * Применяет тему к документу
   */
  private applyTheme(isDark: boolean): void {
    const htmlElement = document.documentElement;
    const bodyElement = document.body;

    if (isDark) {
      htmlElement.classList.add(this.DARK_THEME_CLASS);
      bodyElement.classList.add(this.DARK_THEME_CLASS);
    } else {
      htmlElement.classList.remove(this.DARK_THEME_CLASS);
      bodyElement.classList.remove(this.DARK_THEME_CLASS);
    }
  }

  /**
   * Сохраняет тему в localStorage
   */
  private saveTheme(): void {
    localStorage.setItem(
      this.THEME_KEY,
      this.isDarkMode() ? 'dark' : 'light'
    );
  }
}
