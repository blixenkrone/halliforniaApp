import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../services/database.service';
import { catchError } from 'rxjs/operators';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { DialogService } from '../../services/dialog.service';


export interface IStoryModal {
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

  /*TODO:
  1. Curated tag
  3. Video source
  4. Userpicture
  5. Modal: Uploaddate, verified (green hak).
  */


  dbData = new BehaviorSubject<any>(null);
  // storiesData = this.dbData.asObservable();

  storiesArr = [];
  maxStories: number = 15;
  newLoad: boolean = false;
  isLoading: boolean;
  timeBeforeAnimation = 2000;

  constructor(
    private dialogSrv: DialogService,
    private dbSrv: DatabaseService) { }

  ngOnInit() {
    // Init feed
    this.loadInit();
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
    // this.modalSrv.open(story, { size: 'lg', centered: true })
    // ModalComponent.prototype.openStory(story);
  }

  loadInit() {
    this.isLoading = true;
    this.dbSrv.curatedStoriesFromDB
      .pipe(catchError(err => of(err)))
      .subscribe((data: any[]) => {
        this.dbData.next(data);
        this.storiesArr = data;
        this.storiesArr.sort((a, b) => b.isFestival.moment - a.isFestival.moment);
        this.storiesArr.forEach(story => {
          console.log(story.isFestival);
          this.getUserProfiles(story.userId)
        });
        console.log(this.storiesArr);
        if (this.storiesArr.length > this.maxStories) {
          console.log('resize array');
          this.resetArraySize();
        }
        this.isLoading = false;
      });
  }

  getUserProfiles(id) {
    // get user id's
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
      window.location.reload();
    } else {
      return;
    }
  }

  removeAllStories(storyArr) {
    storyArr.forEach(story => {
      this.dbSrv.removeStoryFromFeed(story);
    });
  }



}
