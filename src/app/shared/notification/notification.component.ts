import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NOTIFICATION_TYPES } from 'src/app/models/notification';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  types = NOTIFICATION_TYPES;
  @Input() notificationType!: NOTIFICATION_TYPES;
  @Input() notificationMessage!: string;
  @Output() closeNotification = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void { }

  close() {
    this.closeNotification.emit();
  }

}
