import { Component, OnInit } from '@angular/core';
import { Router, Event, /*NavigationStart,*/ NavigationEnd, NavigationError } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { PAGES_PATH } from 'src/app/models/models';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  pageTitle: string | undefined;
  user$!: Observable<User | undefined | null>;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    this.user$ = this.authService.user;
    this.pageTitle = this.getPageTitle(router.url);
    this.router.events.subscribe((event: Event) => {
      // if (event instanceof NavigationStart) {
      //   console.log('Route change detected');
      // }
      if (event instanceof NavigationEnd) {
        this.pageTitle = this.getPageTitle(event.url);
      }
      if (event instanceof NavigationError) {
        // Present error to user
        console.error(event?.error);
      }
    });
  }

  ngOnInit(): void {
  }

  private getPageTitle(url: string): string | undefined {
    switch (url) {
      case `/${PAGES_PATH.HOME}`:
        return 'Home';
        break;

      case `/${PAGES_PATH.FAVORITS}`:
        return 'Favorits';
        break;

      case `/${PAGES_PATH.MY_ORDERS}`:
        return 'My Orders';
        break;

      case `/${PAGES_PATH.PROFILE}`:
        return 'My Profile';
        break;

      default:
        return undefined
    }
  }

}
