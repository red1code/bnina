import { Component } from '@angular/core';
import { AuthService } from './auth/services/auth.service';
import { User } from './models/user';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  user$: Observable<User | undefined | null>;

  constructor(private authService: AuthService) {
    this.user$ = this.authService.user;
  }

}
