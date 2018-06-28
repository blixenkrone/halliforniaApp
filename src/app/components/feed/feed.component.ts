import { AngularFirestoreCollection } from 'angularfire2/firestore';
import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../services/database.service';
import { map, filter, catchError, count, elementAt, last } from 'rxjs/operators';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { NgxMasonryOptions } from 'ngx-masonry';
import { AngularFireList } from 'angularfire2/database';

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
  // storiesData = this.dbData.asObservable();

  storiesArr = [];
  maxStories: number = 6;
  newLoad: boolean = false;
  isLoading: boolean;
  timeBeforeAnimation = 2000;

  masonryOptions: NgxMasonryOptions = {
    transitionDuration: '0.8s',
    itemSelector: '.feed-container, .masonry-item.masonry-item.feed-row',
    columnWidth: 30,
    initLayout: true,
    resize: false,
    horizontalOrder: true,
    gutter: 5,
    fitWidth: true
  }

  constructor(
    private dbSrv: DatabaseService) { }

  ngOnInit() {
    // Init feed
    this.loadInit();
    // this.removeAllStories(this.storiesArr)
  }

  isSmall(id: number, num: number) {
    return id % num === 0 ? false : true;
  }

  doOtherStuff(event) {
    console.log('done removing')
  }

  loadInit() {
    this.isLoading = true;
    this.dbSrv.curatedStoriesFromDB
      .pipe(catchError(err => of(err)))
      .subscribe((data: any[]) => {
        this.dbData.next(data);
        this.storiesArr = data;
        this.storiesArr.sort((a, b) => (b.isFestival.moment) - (a.isFestival.moment))
        this.storiesArr.forEach(story => {
          console.log(story.isFestival)
        });
        console.log(this.storiesArr)
        if (this.storiesArr.length > this.maxStories) {
          console.log('resize array')
          this.resetArraySize();
        }
        this.isLoading = false;
      })
  }

  removeAllStories(storyArr) {
    storyArr.forEach(story => {
      this.dbSrv.removeStoryFromFeed(story);
    });
  }

  resetArraySize() {
    this.isLoading = true;
    const removedStory = this.storiesArr.pop();
    console.log(removedStory)
    this.dbSrv.removeStoryFromFeed(removedStory);
    this.isLoading = false;
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
      window.location.reload();
    } else {
      return;
    }
  }

}
