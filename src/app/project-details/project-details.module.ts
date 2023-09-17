import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectDetailsRoutingModule } from './project-details-routing.module';
import { ProjectDetailsComponent } from './project-details.component';
import { SharedModule } from '../shared/shared.module';
import { ErrorInstructionComponent } from './error-instruction/error-instruction.component';

import { Step3Component } from './error-instruction/steps/step3/step3.component';
import { Step1Component } from './error-instruction/steps/step1/step1.component';
import { Step2Component } from './error-instruction/steps/step2/step2.component';
import { StepNavComponent } from './error-instruction/step-nav/step-nav.component';

@NgModule({
  declarations: [
    ProjectDetailsComponent,
    ErrorInstructionComponent,
    Step1Component,
    Step2Component,
    Step3Component,
    StepNavComponent,
  ],
  imports: [CommonModule, ProjectDetailsRoutingModule, SharedModule],
})
export class ProjectDetailsModule {
  a = 'test';
}
