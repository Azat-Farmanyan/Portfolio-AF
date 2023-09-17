import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.scss', '../steps.component.scss'],
})
export class Step2Component {
  @Input() stepNum: number = 1;
}
