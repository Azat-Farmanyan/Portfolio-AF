import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { CarouselComponent } from './carousel/carousel.component';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { TextCutPipe } from '../pipes/text-cut.pipe';
import { HeaderComponentV2 } from './header_v2/header.component';
import { SectionNavComponent } from './section-nav/section-nav.component';
import { AdvancedImageComponent } from './advanced-image/advanced-image.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../app.module';
import { HttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
    FooterComponent,
    CarouselComponent,
    TextCutPipe,
    HeaderComponentV2,
    SectionNavComponent,
    AdvancedImageComponent,
  ],
  imports: [
    CommonModule, 
    NgbCarouselModule,
    TranslateModule,
  ],
  exports: [
    FooterComponent,
    NgbCarouselModule,
    CarouselComponent,
    TextCutPipe,
    HeaderComponentV2,
    SectionNavComponent,
    AdvancedImageComponent,
  ],
})
export class SharedModule {}
