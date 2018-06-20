import { AngularFirestoreCollection } from 'angularfire2/firestore';
import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../services/database.service';
import { map, filter, catchError, count } from 'rxjs/operators';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { NgxMasonryOptions } from 'ngx-masonry';

export interface IFeedStory {
  storyOriginal: string;
  storyType: string;
  storyId: string;
  upvotes: number;
  userPicture: string;
  displayName: string;
  tags: string[];
  uploadDate: number;
}
@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})

export class FeedComponent implements OnInit {
  storiesData = new BehaviorSubject<any>(null);
  maxStories: number = 3;
  newLoad: boolean = false;
  isLoading: boolean;
  timeBeforeAnimation = 2000;

  masonryOptions: NgxMasonryOptions = {
    transitionDuration: '1.8s',
    horizontalOrder: true,
    gutter: 20,
    resize: true,
    initLayout: true,
    fitWidth: true
  }

  constructor(
    private dbSrv: DatabaseService) { }

  ngOnInit() {
    // Init feed
    this.loadInit();
  }

  loadInit() {
    this.isLoading = true;
    const dbRef = this.dbSrv.curatedStoriesFromDB
      .pipe(catchError(err => of(err)))
      .subscribe(data => {
        this.storiesData.next(data);
        if (data.length > this.maxStories) {
          console.log('Too many stories')
          this.resetArraySize();
        }
        // data.forEach(story => {
        //   console.log(story)
        // });
        this.isLoading = false;
      })
  }

  resetArraySize() {
    this.storiesData
      .subscribe(data => {
        data.forEach(story => {

          // const ranNum = Math.floor(Math.random() * 9) + 1;
          // const ref = document.getElementById(`${ranNum}`);
        });
      })

  }

  deleteStory(story) {
    console.log(story)
    const confirmed = confirm('Delete this story from feed?');
    const deleteStory = () => this.dbSrv.removeStoryFromFeed(story);
    if (confirmed) {
      deleteStory();
    } else {
      return;
    }
  }

}

  /**
   * https://app.asana.com/0/417326512565358/705488681661663
   * angular animations:
   *    - https://stackblitz.com/edit/angular-carousel-with-animations-final?file=app%2Fcomponents%2Fcarousel%2Fcarousel.component.ts
   * firebase realtime data from service
   */
