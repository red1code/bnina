import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { Observable, switchMap, of } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { HardwareService } from 'src/app/services/hardware.service';
import { STORAGE_KEYS } from 'src/app/models/models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afAuth: AngularFireAuth,
    private userService: UserService,
    private hardwareService: HardwareService,
  ) { }

  get user(): Observable<User | null | undefined> {
    return this.afAuth.authState
      .pipe(
        switchMap(
          auth => auth ? this.userService.getProfile(auth.uid) : of(undefined)
        )
      );
  }

  checkAuthentication(): Promise<boolean> {
    return new Promise(
      (resolve, reject) => this.afAuth.onAuthStateChanged(
        user => user ? resolve(true) : reject()
      )
    )
  }

  logOut() {
    return this.afAuth.signOut();
  }

  async updateUserInfo(userId: string, newData: Partial<User>) {
    const user = await this.afAuth.currentUser;
    const fullName = (newData.firstName && newData.lastName) ? newData?.firstName + newData.lastName : 'User';
    await user?.updateProfile({
      displayName: fullName
    });
    await this.userService.updateProfile(userId, newData);
  }

  async sendVerificationCode(reCaptchaId: string, phoneNumber: string) {
    const reCaptchaVerifier = new firebase.auth.RecaptchaVerifier(reCaptchaId, { size: 'invisible' });
    const credential = await this.afAuth.signInWithPhoneNumber(phoneNumber, reCaptchaVerifier);
    await this.hardwareService.saveToLocalStorage(STORAGE_KEYS.VERIFICATION_ID, credential.verificationId);
  }

  async vefifyPhoneNumberAndSignin(verificationCode: string): Promise<firebase.auth.UserCredential> {
    try {
      const verificationId: string = await this.hardwareService
        .getFromLocalStorage(STORAGE_KEYS.VERIFICATION_ID);
      const credentials = firebase.auth.PhoneAuthProvider.credential(verificationId, verificationCode);
      return this.afAuth.signInWithCredential(credentials);
    }
    catch (error) {
      throw (error);
    }
  }

}
