import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatabaseService } from '../../services/database.service';
import { NgbCarouselConfig } from '../../../../node_modules/@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  template:
    `
      <div class="container">
        <div class="feed-container stories justify-content-center d-flex flex-wrap text-center">
          <div class="feed-body story byrd-shade-2 byrd-rad m-0 h-100">
            <ng-container *ngIf="dialogData.storyType === 'single' && dialogData.storyMediaType === 'image'; else videoTmp">
              <img *ngIf="dialogData.storyType==='single'" class="img-fluid" id="feed-img" src="{{dialogData.storyPreview}}">
            </ng-container>
            <ng-template #videoTmp class="h-100">
              <app-video *ngIf="dialogData.storyType === 'single' && dialogData.storyMediaType === 'video'" 
              [inputSrc]="dialogData.storyPreview"></app-video>
            </ng-template>
            <ngb-carousel *ngIf="dialogData.storyType === 'multiple' && !isLoading">
              <ng-template #slideTmp ngbSlide *ngFor="let c of mStoryData; let i = index;">
                <img [src]="[c.mediaPreview]" alt="Byrd!">
              </ng-template>
            </ngb-carousel>
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
                <span class="verified ml-3" *ngIf="dialogData.isVerified">
                  <i class="fas fa-check-circle green-one"></i> Verified story
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
  mStoryData: any[] = [];
  isLoading: boolean = false;

  constructor(
    private ngbConfig: NgbCarouselConfig,
    private dbSrv: DatabaseService,
    @Inject(MAT_DIALOG_DATA) public dialogData) {
  }

  ngOnInit() {
    console.log(this.dialogData)
    if (this.dialogData.storyType === 'multiple') {
      this.ngbConfig.interval = 5000000;
      console.log('multiple story!')
      this.getStoryData();
    }
  }

  public getStoryData() {
    this.isLoading = true;
    this.mStoryData = [];
    this.dbSrv.getSpecificStory(this.dialogData.storyId)
      .subscribe((data) => {
        this.mStoryData.push(...data.media);
        this.isLoading = false;
        console.log(this.mStoryData)
      })

  }

}
