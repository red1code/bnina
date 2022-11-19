import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NOTIFICATION_TYPES } from 'src/app/models/notification';
import { AUTH_MESSAGES } from '../models/models';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  phoneNumber = '';
  code!: string;
  submitting = false;
  codeSent = false;
  notificationTypes = NOTIFICATION_TYPES;
  errMsg: any;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void { }

  async sendVerificationCode() {
    if (!this.phoneNumber) {
      this.errMsg = 'Phone number undefined';
      return;
    }
    this.submitting = true;
    try {
      await this.authService.sendVerificationCode('reCaptcha-container', this.phoneNumber);
      this.codeSent = true;
    }
    catch (error) {
      this.errMsg = error;
    }
    this.submitting = false;
  }

  async vefifyCodeAndLogin() {
    if (!this.code) {
      this.errMsg = 'No verification code';
      return;
    }
    this.submitting = true;
    try {
      const authResult = await this.authService.vefifyPhoneNumberAndSignin(this.code);

      if (authResult === AUTH_MESSAGES.NEW_USER) {
        this.router.navigate(['auth/signup']);
      } else {
        this.router.navigate(['home']);
      }

      this.codeSent = false;
    }
    catch (error) {
      this.errMsg = error;
    }
  }

  changeNumber() {
    this.codeSent = false;
  }

  closeNotification() {
    this.errMsg = null;
  }

}
