import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.scss']
})
export class MealComponent implements OnInit {

  @Input() src!: string;
  @Input() title: string = 'Baked Salmon';
  @Input() details!: string;
  @Input() price!: number;
  @Output() addToCart = new EventEmitter<string>();
  fav = false;

  constructor() { }

  ngOnInit(): void {
  }

  onAddToCart() {
    this.addToCart.emit('Add to cart button clicked!')
  }

}
