
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { environment } from '../../environments/environment';
import { IFeedStory } from '../components/feed/feed.component';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';
@Injectable({
  providedIn: 'root'
})

export class DatabaseService {

  idToken: any;
  dbBaseRef: any = `${environment.environment}/stories`;
  fetchLoad: boolean = false;

  constructor(
    private db: AngularFireDatabase) {
  }


  public get curatedStoriesFromDB(): Observable<any> {
    console.log(environment.environment);
    const dbRef = this.db.list<any>(this.dbBaseRef,
      ref => ref.orderByChild('isFestival').equalTo(true).limitToLast(100));
    return dbRef.valueChanges();
  }

  removeStoryFromFeed(story): Promise<any> {
    const removedAble = this.db.object(`${this.dbBaseRef}/${story.storyId}`)
      .update({ isFestival: null });
    return removedAble;
  }

  removeAllStories() {
    const removeAll = this.db.list<IFeedStory>(`${this.dbBaseRef}`)
    // ref => ref.orderByChild('isFestival').equalTo(true));
    removeAll.update('isFestival', null);
  }

  setData(story) {
    this.db.list<any>(this.dbBaseRef).set(story, { isFestival: null });
  }
}
