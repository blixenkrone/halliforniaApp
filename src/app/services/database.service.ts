
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { environment } from '../../environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class DatabaseService {
  idToken: any;
  storyDbRef: any = `${environment.environment}/stories`;
  userDbRef: any = `${environment.environment}/profiles`;
  fetchLoad: boolean = false;

  constructor(
    private db: AngularFireDatabase) {
  }

  public get curatedStoriesFromDB(): Observable<any> {
    const dbRef = this.db.list<any>(this.storyDbRef,
      ref => ref.orderByChild('isFestival/promotion').equalTo(true).limitToLast(15)).valueChanges();
    return dbRef;
  }

  public fetchUserProfiles(userId): Observable<{}> {
    const userDbRef = this.db.object<any>(`${this.userDbRef}/${userId}`).valueChanges();
    return userDbRef;
  }

  public removeStoryFromFeed(story) {
    const removedFromDB = this.db.object(`${this.storyDbRef}/${story.storyId}`)
      .update({ isFestival: false })
      .then(_ => {
        console.log('success')
      })
      .catch(err => console.log(err))
    return removedFromDB;
  }

  setData(story) {
    this.db.list<any>(this.storyDbRef).set(story, { isFestival: null });
  }
}
