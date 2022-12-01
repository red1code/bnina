import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { PAGES_PATH } from 'src/app/models/models';
import { User } from 'src/app/models/user';
import { HardwareService } from 'src/app/services/hardware.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-address',
  templateUrl: './user-address.component.html',
  styleUrls: ['./user-address.component.scss']
})
export class UserAddressComponent implements OnInit {

  user!: User;
  geoPosition!: google.maps.LatLngLiteral | null;

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private hardwareService: HardwareService
  ) {
    this.authService.user.subscribe(usr => {
      if (usr) {
        this.user = usr;
      }
    })
  }

  ngOnInit(): void { }

  async detectLocation() {
    try {
      this.geoPosition = await this.hardwareService.geoPosition;
      console.warn(this.geoPosition);
    }
    catch (error) {
      alert(error);
    }
  }

  async confirmLocation() {
    if (!this.user?.address && !this.geoPosition) {
      alert('Location undefined!');
      return;
    }
    if (!this.geoPosition) {
      console.warn('location has been confirmed!');
      this.router.navigate([PAGES_PATH.MY_ORDERS]);
    }
    if (this.geoPosition) {
      try {
        await this.userService.updateProfile(this.user.id, { address: this.geoPosition });
        console.warn('your location saved succefully!');
        this.router.navigate([PAGES_PATH.MY_ORDERS]);
      }
      catch (error) {
        alert(error);
      }
    }
  }

  changePosition(position: google.maps.LatLngLiteral) { }

}
