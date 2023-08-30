import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-carousel',
  // templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  template: `
    <ngb-carousel
      [wrap]="true"
      [interval]="3000"
      [pauseOnHover]="true"
      [pauseOnFocus]="true"
      [keyboard]="true"
    >
      <ng-template ngbSlide *ngFor="let image of images">
        <div class="picsum-img-wrapper">
          <img
            style="
              width: 100%;
              object-fit: contain;"
            [src]="image"
            alt="Random first slide"
          />
        </div>
      </ng-template>
    </ngb-carousel>
  `,
})
export class CarouselComponent {
  @Input() images: string[] | undefined;
}
