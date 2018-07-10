import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VideoComponent } from './video.component';

@Component({
  selector: 'app-modal',
  template:
    `
    <div class="container">
      <div class="feed-container stories justify-content-center d-flex flex-wrap text-center">
      <div class="feed-body story byrd-shade-2 byrd-rad m-0">
          <ng-container *ngIf="dialogData.mediaType === 'image' || !dialogData.mediaType; else videoTmp">
            <img class="img-fluid" id="feed-img" src="{{dialogData.storyPreview}}">
          </ng-container>
          <ng-template #videoTmp>
            <app-video class="img-fluid" id="feed-img" [inputSrc]="dialogData.storyPreview"></app-video>
          </ng-template>
          <div class="feed-text story-content d-flex justify-content-center">
            <div class="feed-header col-12">
              <p class="mb-0">{{dialogData.storyHeadline}}</p>
              <span class="story-avatar">
                <img class="ml-3" src="{{dialogData.userPicture}}" onError="this.src='../../../assets/images/bloody-bird-logo.svg'">
                <a class="user-info ml-3">@{{dialogData.displayName}}</a>
              </span>
              <span class="icons ml-3">
                <i class="far fa-eye mr-1"></i>{{dialogData.impressions}}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    `,
  styles: []
})
export class ModalComponent implements OnInit {

  title = 'hello!';

  constructor(
    private videoMdl: VideoComponent,
    @Inject(MAT_DIALOG_DATA) public dialogData) {
    this.videoMdl = videoMdl;
  }

  ngOnInit() {
    // this.getStoryData();
  }

  public getStoryData() {
  }

}
