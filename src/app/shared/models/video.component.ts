import { Component, OnInit, Input } from '@angular/core';
import { VgAPI } from 'videogular2/core';

@Component({
  selector: 'app-video',
  template:
    `
    <vg-player (onPlayerReady)="onPlayerReady($event)" autoplay>
      <video [vgMedia]="media" #media id="singleVideo" preload="auto">
        <source src="{{inputSrc}}" autoplay="true" type="video/mp4">
      </video>
    </vg-player>
    `,
  styles: []
})

export class VideoComponent implements OnInit {
  @Input() inputSrc: any;
  vgApi: VgAPI;

  constructor() { }

  ngOnInit() { }

  onPlayerReady(api: VgAPI) {
    this.vgApi = api;
    this.vgApi.getDefaultMedia().subscriptions.canPlay
      .subscribe(() => {
        this.vgApi.play();
      })
    this.vgApi.getDefaultMedia().subscriptions.ended
      .subscribe(() => {
        this.vgApi.play();
      })
  }


}
