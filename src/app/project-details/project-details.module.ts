import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectDetailsRoutingModule } from './project-details-routing.module';
import { ProjectDetailsComponent } from './project-details.component';
import { SharedModule } from '../shared/shared.module';
import { ErrorInstructionComponent } from './error-instruction/error-instruction.component';

import { StepNavComponent } from './error-instruction/step-nav/step-nav.component';
import { StepComponent } from './error-instruction/steps/step/step.component';
import { Step1Component } from './error-instruction/steps/step/step1/step1.component';
import { Step2Component } from './error-instruction/steps/step/step2/step2.component';
import { Step3Component } from './error-instruction/steps/step/step3/step3.component';

@NgModule({
  declarations: [
    ProjectDetailsComponent,
    ErrorInstructionComponent,
    StepNavComponent,
    StepComponent,
    Step1Component,
    Step2Component,
    Step3Component,
  ],
  imports: [CommonModule, ProjectDetailsRoutingModule, SharedModule],
})
export class ProjectDetailsModule {
  a = 'test';
}
