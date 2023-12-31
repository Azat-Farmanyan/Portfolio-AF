import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.scss', '../../steps.component.scss'],
})
export class Step1Component {
  @Output() onNext = new EventEmitter();
}
