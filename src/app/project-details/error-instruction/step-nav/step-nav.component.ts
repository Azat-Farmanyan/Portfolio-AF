import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-step-nav',
  templateUrl: './step-nav.component.html',
  styleUrls: ['./step-nav.component.scss'],
})
export class StepNavComponent {
  @Input() activeStep: number = 1;

  @Output() setActiveStep = new EventEmitter();
}
