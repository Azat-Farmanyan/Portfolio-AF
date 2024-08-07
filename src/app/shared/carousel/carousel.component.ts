import {
  trigger,
  transition,
  style,
  animate,
  state,
} from '@angular/animations';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';

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
      transition('show <=> hide', [
        animate('300ms ease-in-out', style({ opacity: 0 })),
        // Add a delay of 500ms in between hiding and showing
        animate('1000ms 300ms ease-in-out', style({ opacity: 1 })),
      ]),
      // transition('show => hide', animate('300ms ease-out')),
      // transition('hide => show', animate('300ms ease-in')),
    ]),
  ],
})
export class CarouselComponent implements OnInit, OnChanges {
  @Input() images: string[] | undefined;
  @Output() onActiveImage = new EventEmitter<string>();

  defaultImg = '';
  activeDot = 0;
  imgLength = 0;
  showImage: boolean = true;
  animationTime = 0;

  screenshotsPath = '../../../assets/screenshots/';

  isLoading = true;

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['images']) {
      this.updateImagePaths();
      this.setActiveImg();
      this.setImgsLength();
      this.isLoading = false;
    }
  }

  updateImagePaths() {
    if (this.images) {
      this.images = this.images.map((image) => this.screenshotsPath + image);
    }
  }

  toggleImage() {
    this.showImage = !this.showImage;

    setTimeout(() => {
      this.showImage = !this.showImage;
    }, this.animationTime);
  }

  setActiveImg() {
    setTimeout(() => {
      if (!!this.images) {
        this.defaultImg = this.images[this.activeDot];
        this.onActiveImage.emit(this.defaultImg);
      }

      // console.log(this.activeDot);
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
