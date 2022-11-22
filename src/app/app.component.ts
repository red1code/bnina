import { Component } from '@angular/core';
import { AuthService } from './auth/services/auth.service';
import { User } from './models/user';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  user$: Observable<User | undefined>;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.user$ = this.authService.user;
    this.authService.user.subscribe(usr => {
      if (!usr) {
        this.router.navigate(['auth']);
      }
    })
  }

}
