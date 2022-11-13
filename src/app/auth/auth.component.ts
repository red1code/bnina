import { Component, OnInit } from '@angular/core';
import { NOTIFICATION_TYPES } from 'src/app/auth/models/notification';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  notificationTypes = NOTIFICATION_TYPES;

  constructor() { }

  ngOnInit(): void {
  }

  closeNote() {
    alert('close btn pressed')
  }

}
