import { Component, Input, OnInit } from '@angular/core';
import { Skill, SkillsService } from 'src/app/services/skills.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  @Input() activeSection: string = '';
  skills: Skill[] = [];
  randomSkillNumber = 0;
  readMore = false;
  isPaused = false;

  constructor(private skillsService: SkillsService) {
    this.skills = this.skillsService.getSkills();
  }

  ngOnInit(): void {
    const randomNums = [];
    setInterval(() => {
      this.randomSkillNumber = this.getRandomNumber(this.skills.length);
    }, 2000);
  }

  pauseScroll() {
    this.isPaused = true;
  }

  resumeScroll() {
    this.isPaused = false;
  }

  getRandomNumber(max: number) {
    // Generate a random floating-point number between 0 (inclusive) and 1 (exclusive)
    const randomFloat = Math.random();

    // Scale the randomFloat to be between 0 and max (exclusive)
    const randomNumber = Math.floor(randomFloat * max);

    return randomNumber;
  }
}
