import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from 'src/app/models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit {

  user!: User;

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {
    this.authService.user.subscribe(usr => {
      if (usr) {
        this.user = usr;
      }
    })
  }

  ngOnInit(): void { }

  confirmOrders() { }

}
