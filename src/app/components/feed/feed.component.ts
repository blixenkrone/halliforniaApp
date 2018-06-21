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
  maxStories: number = 6;
  newLoad: boolean = false;
  isLoading: boolean;
  timeBeforeAnimation = 2000;

  masonryOptions: NgxMasonryOptions = {
    transitionDuration: '1.8s',
    itemSelector: '.masonry-item',
    columnWidth: 20,
    gutter: 5,
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

  isOdd(id: number) {
    // tslint:disable-next-line:curly
    if (id === 4) return 'iss-odd-4';
    return id % 2 === 0 ? false : true;
  }

  loadInit() {
    this.isLoading = true;
    const dbRef = this.dbSrv.curatedStoriesFromDB
      .pipe(catchError(err => of(err)))
      .subscribe((data: any[]) => {
        const event = new MouseEvent('click');
        console.log(event.timeStamp);
        // data.sort((a, b) => parseFloat(b.pictureDate) - parseFloat(a.pictureDate))
        this.storiesData.next(data);
        console.log(this.storiesData.getValue())
        if (data.length > this.maxStories) {
          console.log('Too many stories')
          this.resetArraySize(data);
        }
        // data.forEach(story => {
        //   console.log(story)
        // });
        this.isLoading = false;
      })
  }

  resetArraySize(stories: any[]) {
    const $stories = stories;
    while ($stories.length > this.maxStories) {
      console.log($stories.pop())
      this.storiesData.next($stories)
      console.log(this.storiesData.getValue())
    }
    return $stories;
  }

  layout() {
    console.log('masonry layout');

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
