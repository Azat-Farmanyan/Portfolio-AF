import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-advanced-image',
  templateUrl: './advanced-image.component.html',
  styleUrls: ['./advanced-image.component.scss'],
})
export class AdvancedImageComponent {
  @Input({ required: true }) imageUrl!: string;
  @Input({ required: true }) imageUrlSmall!: string;

  isLoaded = false;

  OnImageLoad() {
    console.log('loaded');

    this.isLoaded = true;
  }
}
