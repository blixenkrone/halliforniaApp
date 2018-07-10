
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { environment } from '../../environments/environment';
import { Observable, BehaviorSubject, from, of } from 'rxjs';
// import * as firebase from 'firebase/';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { mergeMap, merge, catchError, flatMap } from 'rxjs/operators';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable({
  providedIn: 'root'
})

export class DatabaseService {
  idToken: any;
  storyDbRef: any = `${environment.environment}/stories`;
  userDbRef: any = `${environment.environment}/profiles`;
  apiUrl: string = environment.apiUrl;
  fetchLoad: boolean = false;

  constructor(
    private af: AngularFireAuth,
    private http: HttpClient,
    private db: AngularFireDatabase) {
  }

  loginWithEmail(email: string, password: string) {
    this.af.auth.signInWithEmailAndPassword(email, password)
      .then(user => {
        console.log('Success!')
      })
      .catch(err => console.log(err))
  }

  getToken(): Observable<any> {
    return from(this.af.auth.currentUser.getIdToken(true));
  }

  public getSpecificStory(storyId): Observable<any> {
    return this.getToken()
      .pipe(flatMap((idToken) => {
        const headers = new HttpHeaders().set('user_token', idToken);
        return this.http.get(`${this.apiUrl}/stories/${storyId}`, { headers: headers })
      }))
  }
  // .pipe(catchError(err => of(err)))
  // .subscribe(data => console.log(data))

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
