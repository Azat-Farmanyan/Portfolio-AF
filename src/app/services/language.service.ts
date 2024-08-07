import { Injectable, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  activeLanguage = signal(
    this.translate.currentLang || this.translate.getDefaultLang()
  );

  private languageSubject = new BehaviorSubject<string>(
    this.translate.currentLang || this.translate.getDefaultLang()
  );

  language$ = this.languageSubject.asObservable();

  constructor(private translate: TranslateService) {
    this.translate.onLangChange.subscribe((event) => {
      this.activeLanguage.set(event.lang);
      this.languageSubject.next(event.lang);
    });
  }
}
