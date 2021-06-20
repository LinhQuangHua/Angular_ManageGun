import { Observable } from 'rxjs/internal/Observable';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { User } from '../models/user';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUser = new BehaviorSubject<User>(null);
  constructor(private angularFireAuth: AngularFireAuth) {
    angularFireAuth.user.subscribe((x) => {
      if (x) {
        this.currentUser.next({
          displayName: x.displayName,
          email: x.email,
        });
      }
    });
  }

  getCurrentUser = (): BehaviorSubject<User> => this.currentUser;

  async loginWithGoogle(): Promise<void> {
    await this.angularFireAuth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    );
  }

  async loginWithEmail(email: string, password: string): Promise<void> {
    await this.angularFireAuth.signInWithEmailAndPassword(email, password);
  }

  async registerWithEmail(email: string, password: string): Promise<void> {
    await this.angularFireAuth
      .createUserWithEmailAndPassword(email, password)
      .then((_) =>
        this.angularFireAuth.signInWithEmailAndPassword(email, password)
      )
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

  logout(): void {
    this.angularFireAuth.signOut();
  }
}
