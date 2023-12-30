import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-advanced-image',
  templateUrl: './advanced-image.component.html',
  styleUrls: ['./advanced-image.component.scss'],
  animations: [
    trigger('skeletonAnimation', [
      state('loading', style({ opacity: 0.5 })),
      state('loaded', style({ opacity: 1 })),
      transition('loading => loaded', animate('300ms ease-in')),
    ]),
  ],
})
export class AdvancedImageComponent {
  @Input({ required: true }) imageUrl!: string;
  @Input({ required: true }) imageUrlSmall: string = '298';
  @Input({ required: true }) imageHeight: number;

  isLoaded = false;

  OnImageLoad() {
    this.isLoaded = true;
  }
}
