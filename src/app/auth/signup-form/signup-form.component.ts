import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { ERRORS } from 'src/app/models/models';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss']
})
export class SignupFormComponent implements OnInit {

  submitting = false;
  errMsg: any;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void { }

  async submitForm(form: NgForm) {
    if (!form.value) throw (ERRORS.NO_FORM_VALUES);
    try {
      await this.userService.createNewProfile({
        firstName: form.controls['first-name'].value,
        lastName: form.controls['last-name'].value,
        email: form.controls['email'].value
      });
      this.router.navigate(['home']);
    }
    catch (error) {
      this.errMsg = error;
    }
  }

  closeNotification() {
    this.errMsg = null;
  }

}
