import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-step3',
  templateUrl: './step3.component.html',
  styleUrls: ['./step3.component.scss', '../../steps.component.scss'],
})
export class Step3Component {
  @Input() projectUrl: string = '';
  @Output() onClose = new EventEmitter();
}
