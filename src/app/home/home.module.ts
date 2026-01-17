import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';
import { AboutComponent } from './about/about.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectCardComponent } from './projects/project-card/project-card.component';
import { ContactComponent } from './contact/contact.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WelcomePageComponent } from './welcome-page/welcome.component';
import { ExperienceComponent } from './experience/experience.component';
import { ExperienceItemComponent } from './experience/experience-item/experience-item.component';
import { ProjectCardComponentV2 } from './projects/project-card-v2/project-card.component';
import { TranslateModule } from '@ngx-translate/core';
import { IntersectionObserverDirective } from '../directives/IntersectionObserver.directive';
import { ProjectsBlockAnimationDirective } from '../directives/ProjectsBlockAnimation.directive';
import { ProjectCardCommertialV1Component } from './projects/project-card-commertial-v1/project-card-commertial-v1.component';
import { ProjectCardV3Component } from './projects/project-card-v3/project-card-v3.component';

@NgModule({
  declarations: [
    HomeComponent,
    AboutComponent,
    ProjectsComponent,
    ProjectCardComponent,
    ProjectCardComponentV2,
    ContactComponent,
    WelcomePageComponent,
    ExperienceComponent,
    ExperienceItemComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    IntersectionObserverDirective,
    ProjectsBlockAnimationDirective,
    ProjectCardCommertialV1Component,
    ProjectCardV3Component,
  ],
})
export class HomeModule {}
