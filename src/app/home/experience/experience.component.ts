import { Component, OnDestroy, OnInit } from '@angular/core';
import { ExperienceService } from 'src/app/services/experience.service';
import { Experience } from '../../services/experience.service';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-experience',
  styleUrls: ['./experience.component.scss'],
  templateUrl: './experience.component.html',
})
export class ExperienceComponent implements OnInit, OnDestroy {
  experience: Experience[] = [];
  currentLang: string;
  private langChangeSubscription: Subscription;
  

  constructor(
    private experienceService: ExperienceService,
    private translate: TranslateService,
  ) {}


  ngOnInit(): void {
    // this.experience = this.experienceService.getExperience();
    this.loadExperience();
    console.log(this.experience);
    
    this.currentLang = this.translate.currentLang || this.translate.getDefaultLang();

    // Подписаться на изменения языка
    this.langChangeSubscription = this.translate.onLangChange.subscribe((event: any) => {
      this.currentLang = event.lang;
      this.loadExperience();
    });
  }

  loadExperience(): void {
    const currentLang = this.translate.currentLang || this.translate.getDefaultLang();
    this.experienceService.getExperience(currentLang).subscribe(data => {
      this.experience = data;
    });
  }


  trackByIndex(index: number): number {
    return index;
  }

  ngOnDestroy(): void {
    if (this.langChangeSubscription) {
      this.langChangeSubscription.unsubscribe();
    }
  }
}
