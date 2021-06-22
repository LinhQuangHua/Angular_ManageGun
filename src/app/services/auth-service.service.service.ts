import { Observable } from 'rxjs/internal/Observable';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { User } from '../models/user';
import { BehaviorSubject } from 'rxjs';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUser = new BehaviorSubject<User>(null);
  constructor(
    private angularFireAuth: AngularFireAuth,
    private angularFirestore: AngularFirestore
  ) {
    angularFireAuth.user.subscribe((x) => {
      if (x) {
        this.currentUser.next({
          email: x.email,
        });
      }
    });
  }

  getCurrentUser = (): BehaviorSubject<User> => this.currentUser;

  async loginWithGoogle(): Promise<void> {
    const credential = await this.angularFireAuth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    );
    await this.updateUserData(credential);
  }

  async loginWithEmail(email: string, password: string): Promise<void> {
    return await this.angularFireAuth
      .signInWithEmailAndPassword(email, password)
      .then(async (credential) => {
        await this.updateUserData(credential);
      });
  }

  async registerWithEmail(email: string, password: string): Promise<void> {
    await this.angularFireAuth
      .createUserWithEmailAndPassword(email, password)
      .then((_) => this.loginWithEmail(email, password))
      .catch((error) => {
        switch (error.code) {
          case 'auth/email-already-in-use':
            alert(`Email address ${email} already in use.`);
            break;
          case 'auth/invalid-email':
            alert(`Email address ${email} is invalid.`);
            break;
          case 'auth/operation-not-allowed':
            alert(`Error during sign up.`);
            break;
          case 'auth/weak-password':
            alert(
              'Password is not strong enough. Add additional characters including special characters and numbers.'
            );
            break;
          default:
            alert(error.message);
            break;
        }
      });
  }

  async updateUserData({ user }: firebase.auth.UserCredential): Promise<void> {
    const userRef: AngularFirestoreDocument<any> = this.angularFirestore.doc(
      `users/${user.uid}`
    );
    const data: User = {
      uid: user.uid,
      email: user.email,
      // roles: {
      //   admin: true,
      // },
    };

    return userRef.set(data, { merge: true });
  }

  logout(): void {
    this.angularFireAuth.signOut();
  }
}
