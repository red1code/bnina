import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  @Input() type!: 'Error' | 'Info' | 'Success';
  @Input() message!: string;
  @Output() closeNotification = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void { }

  close() {
    this.closeNotification.emit();
  }

}
