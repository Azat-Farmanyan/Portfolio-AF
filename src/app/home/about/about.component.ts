import { Component, Input, OnInit, AfterViewInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { Skill, SkillsService } from 'src/app/services/skills.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() activeSection: string = '';
  @ViewChild('skillsContainer', { static: false }) skillsContainer!: ElementRef;
  skills: Skill[] = [];
  readMore = false;
  isPaused = false;
  private scaleInterval: any;

  constructor(private skillsService: SkillsService) {
    this.skills = this.skillsService.getSkills();
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.updateCardScales();
    this.scaleInterval = setInterval(() => {
      this.updateCardScales();
    }, 100);
  }

  ngOnDestroy(): void {
    if (this.scaleInterval) {
      clearInterval(this.scaleInterval);
    }
  }

  updateCardScales(): void {
    if (!this.skillsContainer) return;
    
    const container = this.skillsContainer.nativeElement;
    const wrapper = container.closest('.skills-scroll-wrapper');
    if (!wrapper) return;
    
    const wrapperRect = (wrapper as HTMLElement).getBoundingClientRect();
    const wrapperCenter = wrapperRect.left + wrapperRect.width / 2;
    
    const cards = container.querySelectorAll('.skill-card');
    cards.forEach((card: HTMLElement) => {
      const cardRect = card.getBoundingClientRect();
      const cardCenter = cardRect.left + cardRect.width / 2;
      const distanceFromCenter = Math.abs(cardCenter - wrapperCenter);
      const maxDistance = wrapperRect.width / 2;
      const normalizedDistance = Math.min(distanceFromCenter / maxDistance, 1);
      
      // Scale от 1.0 (центр) до 0.75 (края)
      const scaleFactor = 1 - normalizedDistance * 0.25;
      // Opacity от 1.0 (центр) до 0.2 (20% видимость на краях)
      const opacityFactor = 1 - normalizedDistance * 0.8;
      
      card.style.transform = `scale(${Math.max(0.75, Math.min(1.0, scaleFactor))})`;
      card.style.opacity = `${Math.max(0.2, Math.min(1.0, opacityFactor))}`;
    });
  }

  pauseScroll() {
    this.isPaused = true;
  }

  resumeScroll() {
    this.isPaused = false;
  }
}
