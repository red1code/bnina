import { Component } from '@angular/core';
import { AuthService } from './auth/services/auth.service';
import { User } from './models/user';
import { Observable } from 'rxjs';
import { HardwareService } from './services/hardware.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  user$: Observable<User | undefined | null>;
  isConnected: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private hardwareService: HardwareService
  ) {
    this.user$ = this.authService.user;
    this.isConnected = this.hardwareService.isConnected;
    this.hardwareService.triggerHardwareBackBtn();
  }

}
