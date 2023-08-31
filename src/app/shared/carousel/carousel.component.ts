import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
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
              height: 70vh;
              object-fit: contain;"
            [src]="image"
            alt="Random first slide"
          />
        </div>
      </ng-template>
    </ngb-carousel>
  `,
})
export class CarouselComponent implements OnChanges {
  @Input() images: string[] | undefined;

  defaultImg = '';
  activeDot = 0;
  imgLength = 0;

  ngOnChanges(): void {
    this.setActiveImg();
    this.setImgsLength();
  }

  setActiveImg() {
    if (!!this.images) this.defaultImg = this.images[this.activeDot];
  }

  setImgsLength() {
    if (!!this.images) this.imgLength = this.images.length;
  }

  clickRight() {
    this.activeDot++;
    if (this.activeDot === this.imgLength) this.activeDot = 0;
    this.setActiveImg();
  }
  clickLeft() {
    this.activeDot--;
    if (this.activeDot < 0) this.activeDot = this.imgLength - 1;
    this.setActiveImg();
  }

  checkLengthOfImages() {
    if (this.images) {
    }
  }
}
