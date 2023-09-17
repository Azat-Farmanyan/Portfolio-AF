import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-step-nav',
  templateUrl: './step-nav.component.html',
  styleUrls: ['./step-nav.component.scss'],
})
export class StepNavComponent {
  @Input() activeStep: number = 1;
}
