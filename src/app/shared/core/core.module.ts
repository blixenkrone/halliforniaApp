import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedComponent } from '../../components/feed/feed.component';
import { FirebaseModule } from './firebase.module';
import { AnimationsModule } from './animations.module';
import { NgxMasonryModule } from 'ngx-masonry';
@NgModule({
  imports: [
    CommonModule,
    NgxMasonryModule,
    AnimationsModule
  ],
  exports: [
    FeedComponent
  ],
  declarations: [
    FeedComponent
  ]
})
export class CoreModule { }
