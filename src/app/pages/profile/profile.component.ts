import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: Observable<User | undefined>;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    this.user = this.authService.user;
  }

  ngOnInit(): void {
  }

  editProfile() {
    alert('This functionality hasn\'t been implemented yet!')
  }

  async logOut() {
    try {
      await this.authService.logOut();
      this.router.navigate(['auth']);
    }
    catch (error) {
      alert(error);
    }
  }

}
