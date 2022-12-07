import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PAGES_PATH } from '../models/models';
import { UserService } from '../services/user.service';
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
  errMsg: any;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

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
      this.userService.getProfile(authResult.user?.uid)
        .subscribe(doc => {
          doc?.firstName ?
            this.router.navigate([PAGES_PATH.HOME]) :
            this.router.navigate([PAGES_PATH.SIGNUP]);
          this.codeSent = false;
        });
    }
    catch (error) {
      this.errMsg = error;
    }
    this.submitting = false;
  }

  changeNumber() {
    this.codeSent = false;
  }

  closeNotification() {
    this.errMsg = null;
  }

}
