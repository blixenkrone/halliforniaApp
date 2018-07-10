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
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalComponent } from '../models/modal.component';
import { TimeAgoPipe } from 'time-ago-pipe';

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
    MatDialogModule
  ],
  exports: [
    FeedComponent,
    VideoComponent,
    ModalComponent
  ],
  declarations: [
    FeedComponent,
    VideoComponent,
    ModalComponent,
    TimeAgoPipe
  ],
  bootstrap: [VideoComponent],
  providers: [{
    provide: ModalComponent,
    useValue: {}
  }, {
    provide: MAT_DIALOG_DATA,
    useValue: {}
  },
    VideoComponent
  ],
  entryComponents: [ModalComponent]
})
export class CoreModule { }
