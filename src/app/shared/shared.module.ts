import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CarouselComponent } from './carousel/carousel.component';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { TextCutPipe } from '../pipes/text-cut.pipe';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    CarouselComponent,
    TextCutPipe,
  ],
  imports: [CommonModule, NgbCarouselModule],
  exports: [
    HeaderComponent,
    FooterComponent,
    NgbCarouselModule,
    CarouselComponent,
    TextCutPipe,
  ],
})
export class SharedModule {}
