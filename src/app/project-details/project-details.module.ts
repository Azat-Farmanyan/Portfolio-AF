import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectDetailsRoutingModule } from './project-details-routing.module';
import { ProjectDetailsComponent } from './project-details.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ProjectDetailsComponent],
  imports: [CommonModule, ProjectDetailsRoutingModule, SharedModule],
})
export class ProjectDetailsModule {
  a = 'test';
}
