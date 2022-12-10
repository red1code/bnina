import { Meal } from './../../models/meal';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.scss']
})
export class MealComponent implements OnInit {

  @Input() meal!: Meal;
  @Output() addToCart = new EventEmitter<Meal>();
  @Output() addToFavorites = new EventEmitter<Meal>();
  fav = false;

  constructor() { }

  ngOnInit(): void {
  }

  onAddToCart() {
    this.addToCart.emit(this.meal);
  }

  onaddToFavorites() {
    this.addToFavorites.emit(this.meal);
    this.fav = true;
  }

}
