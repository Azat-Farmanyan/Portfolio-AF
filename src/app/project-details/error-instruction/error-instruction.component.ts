import { Component } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
@Component({
  selector: 'app-error-instruction',
  templateUrl: './error-instruction.component.html',
  styleUrls: ['./error-instruction.component.scss'],
  animations: [
    trigger('slideInAnimation', [
      state(
        'void',
        style({
          opacity: 0,
          transform: 'translateX(-100%)',
        })
      ),
      transition(':enter', [
        animate(
          '0.5s ease-out',
          style({
            opacity: 1,
            transform: 'translateX(0)',
          })
        ),
      ]),
    ]),
  ],
})
export class ErrorInstructionComponent {
  stepNum: number = 1;

  next() {
    this.stepNum++;
  }
  prev() {
    this.stepNum--;
  }
}
