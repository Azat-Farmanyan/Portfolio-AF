import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.scss', '../steps.component.scss'],
})
export class StepComponent {
  @Input() stepNum: number = 1;
  @Input() projectUrl: string = '';

  @Output() onClose = new EventEmitter();

  step1() {
    this.stepNum = 1;
  }
  step2() {
    this.stepNum = 2;
  }
  step3() {
    this.stepNum = 3;
  }

  setStepNum(stepNum: number) {
    this.stepNum = stepNum;
  }
}
