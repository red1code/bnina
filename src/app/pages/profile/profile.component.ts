import { HardwareService } from './../../services/hardware.service';
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

  user: Observable<User | undefined | null>;

  constructor(
    private router: Router,
    private authService: AuthService,
    private hardwareService: HardwareService
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
      if (confirm('Are you sure to log out?')) {
        await this.authService.logOut();
        this.router.navigate(['auth']);
      }
    }
    catch (error) {
      alert(error);
    }
  }

  async exitApp() {
    try {
      await this.hardwareService.quitApp();
    }
    catch (error) {
      alert(error);
    }
  }

}
