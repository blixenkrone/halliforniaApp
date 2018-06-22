import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedComponent } from '../../components/feed/feed.component';
import { AnimationsModule } from './animations.module';
import { NgxMasonryModule } from 'ngx-masonry';
import { BrowserModule } from '@angular/platform-browser';
import { VgCoreModule } from 'videogular2/core';
import { VgControlsModule } from 'videogular2/controls';
import { VgOverlayPlayModule } from 'videogular2/overlay-play';
import { VgBufferingModule } from 'videogular2/buffering';
import { VideoComponent } from '../../shared/models/video.component';


@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    NgxMasonryModule,
    AnimationsModule,
  ],
  exports: [
    FeedComponent
  ],
  declarations: [
    FeedComponent,
    VideoComponent
  ],
  bootstrap: [VideoComponent]
})
export class CoreModule { }
