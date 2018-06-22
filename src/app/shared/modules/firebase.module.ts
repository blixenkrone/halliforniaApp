import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
// import { AngularFirestoreModule, AngularFirestore } from 'angularfire2/firestore';
import { environment } from '../../../environments/environment';
export const firebaseConfig = environment.firebaseConfig; // load firebase setup

@NgModule({
  imports: [
    CommonModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    // AngularFirestoreModule
  ],
  declarations: [],
  providers: []
})
export class FirebaseModule { }
