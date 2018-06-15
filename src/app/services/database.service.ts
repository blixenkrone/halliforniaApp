import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { environment } from '../../environments/environment';
import { IFeedStory } from '../components/feed/feed.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  fetchLoad: boolean = false;

  constructor(
    private db: AngularFireDatabase) { }

  public get curatedStoriesFromDB(): Observable<IFeedStory[]> {
    console.log(environment.environment);
    const dbRef = this.db.list<IFeedStory>(`${environment.environment}/stories`,
      ref => ref.orderByChild('curatedTag').equalTo('#hallifornia')).valueChanges();
    console.log(this.db);
    return dbRef;
  }

}
