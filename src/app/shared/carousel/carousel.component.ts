import {
  trigger,
  transition,
  style,
  animate,
  state,
} from '@angular/animations';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state(
        'show',
        style({
          opacity: 1,
        })
      ),
      state(
        'hide',
        style({
          opacity: 0,
        })
      ),
      transition('show => hide', animate('300ms ease-out')),
      transition('hide => show', animate('300ms ease-in')),
    ]),
  ],
})
export class CarouselComponent implements OnChanges {
  @Input() images: string[] | undefined;

  defaultImg = '';
  activeDot = 0;
  imgLength = 0;
  showImage: boolean = true;
  animationTime = 0;

  isLoading = true;

  ngOnChanges(): void {
    this.setActiveImg();
    this.setImgsLength();
    this.isLoading = false;
  }

  toggleImage() {
    this.showImage = !this.showImage;

    setTimeout(() => {
      this.showImage = !this.showImage;
    }, 300);
  }

  setActiveImg() {
    setTimeout(() => {
      if (!!this.images) this.defaultImg = this.images[this.activeDot];

      console.log(this.activeDot);
    }, this.animationTime);
  }

  setImgsLength() {
    if (!!this.images) this.imgLength = this.images.length;
    this.animationTime = 300;
  }

  clickRight() {
    this.activeDot++;
    if (this.activeDot === this.imgLength) this.activeDot = 0;
    this.toggleImage();
    this.setActiveImg();
  }
  clickLeft() {
    this.activeDot--;
    if (this.activeDot < 0) this.activeDot = this.imgLength - 1;
    this.toggleImage();
    this.setActiveImg();
  }

  setActiveDot(dotIndex: number) {
    if (dotIndex !== this.activeDot) {
      this.activeDot = dotIndex;
      this.toggleImage();
      this.setActiveImg();
    }
  }
}
