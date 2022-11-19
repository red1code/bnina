import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth/services/auth.service';
import { User } from './models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  user!: Observable<User | undefined>;

  constructor(private authService: AuthService, private router: Router) {
    this.user = this.authService.user
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
