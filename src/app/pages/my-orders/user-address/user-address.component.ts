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

  user!: User | null;
  geoPosition!: google.maps.LatLngLiteral | null;
  oldPositionExist!: boolean;

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private hardwareService: HardwareService
  ) {
    this.authService.user.subscribe(usr => {
      this.user = usr || null;
      this.geoPosition = usr?.address || null;
      this.oldPositionExist = usr?.address ? true : false;
    })
  }

  ngOnInit(): void { }

  async detectLocation() {
    try {
      this.geoPosition = await this.hardwareService.geoPosition;
    }
    catch (error: any) {
      const request = '. Please activate location access from settings.';
      const errMsg = (error.message === 'location disabled') ? error.message + request : error.message;
      alert(errMsg);
    }
  }

  async confirmLocation() {
    if (!this.user) {
      // this can never happen because of auth guard, but code below requires this block of code!
      alert('User undefined!');
      return;
    }
    if (!this.geoPosition) {
      // theoretically this should never happen since the button will be disabled, but I wrote it anyway :)
      alert('Location undefined!');
      return;
    }

    if (!this.isNewLocation()) { // confirming the old location
      await this.router.navigate([PAGES_PATH.MY_ORDERS]);
      alert('Your old location has been confirmed!')
    }

    if (this.isNewLocation()) { // assigning new location
      try {
        await this.userService.updateProfile(this.user.id, { address: this.geoPosition });
        await this.router.navigate([PAGES_PATH.MY_ORDERS]);
        alert('your new location has been confirmed!')
      }
      catch (error) {
        alert(error);
      }
    }
  }

  changePosition(position: google.maps.LatLngLiteral) {
    this.geoPosition = position;
  }

  private isNewLocation(): boolean {
    if (!this.user?.address || (this.geoPosition !== this.user?.address)) {
      return true;
    }
    return false;
  }

}
