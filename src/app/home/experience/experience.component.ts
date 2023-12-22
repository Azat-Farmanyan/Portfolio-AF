import { Component, OnInit } from '@angular/core';
import { ExperienceService } from 'src/app/services/experience.service';
import { Experience } from '../../services/experience.service';

@Component({
  selector: 'app-experience',
  styleUrls: ['./experience.component.scss'],
  templateUrl: './experience.component.html',
})
export class ExperienceComponent implements OnInit {
  experience: Experience[] = [];

  constructor(private experienceService: ExperienceService) {}
  ngOnInit(): void {
    this.experience = this.experienceService.getExperience();
  }
}
