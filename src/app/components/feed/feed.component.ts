import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../services/database.service';
import { catchError, toArray } from 'rxjs/operators';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { DialogService } from '../../services/dialog.service';
import { environment } from '../../../environments/environment';
// import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})

export class FeedComponent implements OnInit {

  /*TODO:
  1. Login box
  2. Waves length
  */

  storiesArr = [];
  maxStories: number = 15;
  isLoading: boolean;
  animationStory: any;
  state: string;

  constructor(
    private dialogSrv: DialogService,
    private dbSrv: DatabaseService) { }

  ngOnInit() {
    // Init feed
    this.quickLogin();
    this.loadInit();
  }

  animateStory(index) {
    // console.log('animate: ' + index)
    if (index === 0) {
      return 'story-animation in';
    }
    // if (index === 14) {
    //   ngclass = 'story-animation out';
    // }
    return '';
  }


  loadInit() {
    this.isLoading = true;
    this.dbSrv.curatedStoriesFromDB
      .pipe(catchError(err => of(err)))
      .subscribe((data: any[]) => {
        this.storiesArr = data;
        this.storiesArr.sort((a, b) => b.isFestival.moment - a.isFestival.moment);
        console.log(this.storiesArr);
        if (this.storiesArr.length > this.maxStories) {
          console.log('resize array');
          this.resetArraySize();
        }
        this.isLoading = false;
      });
  }

  quickLogin() {
    const pw = prompt('Password:', '')
    console.log(pw)
    if (environment.production) {
      this.dbSrv.loginWithEmail('hello@byrd.news', pw);
    } else {
      this.dbSrv.loginWithEmail('simon@byrd.news', pw);
    }
  }

  isSmall(id: number, num: number) {
    return id % num === 0 ? false : true;
  }

  isIndexed(id: number) {
    if (id === 6 || id === 7 || id === 8) {
      return true;
    }
    return false;
  }

  onMouseHover(index, story) {
    console.log(index, story.storyId)
    this.dialogSrv.openDialog(story);
  }

  getUserProfiles(id, index) {
    this.dbSrv.fetchUserProfiles(id)
      .pipe(catchError(err => of(err)))
      .subscribe((users: any[]) => {
        // console.log(users)
        // console.log(index)
      })
  }

  resetArraySize() {
    this.isLoading = true;
    const removedStory = this.storiesArr.pop();
    console.log(removedStory);
    this.dbSrv.removeStoryFromFeed(removedStory);
    this.isLoading = false;
  }

  deleteStory(story) {
    console.log(story);
    const confirmed = confirm('Delete this story from feed?');
    const deleteStory = () => this.dbSrv.removeStoryFromFeed(story);
    if (confirmed) {
      deleteStory();
      // window.location.reload();
    } else {
      return;
    }
  }

  removeAllStories() {
    this.storiesArr.forEach(story => {
      this.dbSrv.removeStoryFromFeed(story);
    });
  }

}
