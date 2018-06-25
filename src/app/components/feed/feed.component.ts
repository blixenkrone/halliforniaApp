import { AngularFirestoreCollection } from 'angularfire2/firestore';
import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../services/database.service';
import { map, filter, catchError, count, elementAt, last } from 'rxjs/operators';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { NgxMasonryOptions } from 'ngx-masonry';
import { } from '@angular/router/src/utils/collection';

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
  dbData = new BehaviorSubject<any>(null);
  storiesData = this.dbData.asObservable();

  storiesArr: Observable<any>[] = [];
  maxStories: number = 9;
  newLoad: boolean = false;
  isLoading: boolean;
  timeBeforeAnimation = 2000;

  masonryOptions: NgxMasonryOptions = {
    transitionDuration: '1.8s',
    itemSelector: '.masonry-item',
    columnWidth: 80,
    gutter: 2,
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

  isSmall(id: number, num: number) {
    return id % num === 0 ? false : true;
  }

  loadInit() {
    this.isLoading = true;
    const dbRef = this.dbSrv.curatedStoriesFromDB
      .pipe(
        catchError(err => of(err))
      )
      .subscribe(data => {
        this.dbData.next(data);
        console.log(this.dbData.getValue())
        // data.sort((a, b) => parseFloat(b.pictureDate) - parseFloat(a.pictureDate))
        if (data.length > (this.maxStories)) {
          console.log('Too many stories')
          this.resetArraySize(data);
        }
        this.isLoading = false;
      })
  }

  resetArraySize(stories: any[]) {
    while (stories.length > this.maxStories) {
      const splicedArr = stories.splice(this.maxStories, 1);
      splicedArr.forEach(story => {
        console.log(story)
        this.dbSrv.removeStoryFromFeed(story);
      })
    }
    return stories;
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
