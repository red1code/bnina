import { MealService } from './../../services/meal.service';
import { Meal } from './../../models/meal';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  meals!: Meal[];

  constructor(private mealService: MealService) { }

  ngOnInit(): void {
    this.meals = this.mealService.getMeals();
  }

  addToCart(meal: Meal) {
    console.warn(`"${meal.name}" has been added to the cart!`);
  }

  addToFavorites(meal: Meal) {
    console.warn(`"${meal.name}" has been added to favorites!`);
  }

}
