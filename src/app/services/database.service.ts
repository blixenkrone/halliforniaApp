
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { environment } from '../../environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';
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
    const dbRef = this.db.list<any>(this.dbBaseRef,
      ref => ref.orderByChild('isFestival/promotion').equalTo(true).limitToLast(15));
    return dbRef.valueChanges();
  }

  public removeStoryFromFeed(story) {
    const removedFromDB = this.db.object(`${this.dbBaseRef}/${story.storyId}`)
      .update({ isFestival: false })
      .then(_ => {
        console.log('success')

      })
      .catch(err => console.log(err))
    return removedFromDB;
  }

  setData(story) {
    this.db.list<any>(this.dbBaseRef).set(story, { isFestival: null });
  }
}
