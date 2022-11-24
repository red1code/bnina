import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, map, of, throwError, catchError } from 'rxjs';
import { ROLES, User } from '../models/user';
import { COLLECTIONS, ERRORS } from '../models/models';
import { AngularFireAuth } from '@angular/fire/compat/auth';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private afAuth: AngularFireAuth,
    private aFstore: AngularFirestore
  ) { }

  getProfile(uid: string | undefined): Observable<User | undefined> {
    if (!uid) return of(undefined);
    return this.aFstore
      .doc<User>(`${COLLECTIONS.PROFILES}/${uid}`)
      .valueChanges()
      .pipe(
        map(data => {
          if (!data) return undefined;
          return {
            ...data,
            signupDate: new Date(data.signupDate),
            lastLoggedin: new Date(data.lastLoggedin)
          }
        }),
        catchError(error => throwError(() => new Error(error)))
      );
  }

  async createNewProfile(userInfo: { firstName: string; lastName: string; email: string; }) {
    try {
      const firebaseUser = await this.afAuth.currentUser;
      if (!firebaseUser) throw (ERRORS.FIREBASE_USER_NULL);
      const data: User = {
        ...userInfo,
        id: firebaseUser.uid,
        role: ROLES.CUTOMER,
        phone: firebaseUser.phoneNumber ?? '',
        signupDate: new Date().getTime(),
        lastLoggedin: new Date().getTime(),
      };
      return this.aFstore
        .doc<User>(`${COLLECTIONS.PROFILES}/${data.id}`)
        .set(data);
    }
    catch (error) {
      throw (error);
    }
  }

  updateProfile(uid: string, newData: Partial<User>) {
    return this.aFstore
      .doc<User>(`${COLLECTIONS.PROFILES}/${uid}`)
      .update(newData);
  }

}
