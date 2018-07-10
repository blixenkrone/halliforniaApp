import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal',
  template:
    `
    <div class="container">
      <div class="feed-container stories justify-content-center d-flex flex-wrap text-center">
      <div class="feed-body story byrd-shade-2 byrd-rad m-0 h-100">
          <ng-container *ngIf="dialogData.mediaType === 'image' || !dialogData.mediaType; else videoTmp">
            <img class="img-fluid" id="feed-img" src="{{dialogData.storyPreview}}">
          </ng-container>
          <ng-template #videoTmp class="h-100">
            <app-video class="img-fluid" id="feed-img" [inputSrc]="dialogData.storyPreview"></app-video>
          </ng-template>
          <div class="feed-text story-content d-flex justify-content-center">
            <div class="feed-header">
              <div class="modal-heading justify-content-center mb-2">{{dialogData.storyHeadline}}</div>
              <span class="story-avatar">
                <img src="{{dialogData.userPicture}}" onError="this.src='../../../assets/images/bloody-bird-logo.svg'">
                <a class="user-info ml-1">@{{dialogData.displayName}}</a>
              </span>
              <span class="impressions ml-3">
                <i class="far fa-eye mr-1"></i>{{dialogData.impressions}}
              </span>
              <span class="time-ago ml-3">
                <i class="far fa-clock mr-1"></i>{{dialogData.uploadDate | timeAgo}}
              </span>
              <span class="verified ml-3">
                <i class="far fa-check-circle green-one" *ngIf="dialogData.isVerified"></i> Verified story
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

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData) {
  }

  ngOnInit() {
  }

  public getStoryData() {
  }

}
