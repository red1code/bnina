import { Meal } from './../models/meal';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MealService {

  meals: Meal[] = [
    {
      id: 'Beef-mushroom-&-greens-stir-fry',
      createdAt: 1670694317257,
      name: 'Beef, mushroom & greens stir-fry',
      price: 450,
      provider: 'Restaurent-1',
      imgSrc: '/assets/meals/Beef-mushroom-&-greens-stir-fry.jpg'
    }, {
      id: 'Bows-with-tuna-olives-&-capers',
      createdAt: 1670694317257,
      name: 'Bows with tuna, olives & capers',
      price: 550,
      provider: 'Restaurent-2',
      imgSrc: '/assets/meals/Bows-with-tuna-olives-&-capers.jpg'
    }, {
      id: 'Mexican-chicken-burger',
      createdAt: 1670694317257,
      name: 'Mexican chicken burger',
      price: 300,
      provider: 'Restaurent-3',
      imgSrc: '/assets/meals/mexican-chicken-burger.jpg'
    }, {
      id: 'Crab-&-cucumber-crumpets',
      createdAt: 1670694317257,
      name: 'Crab & cucumber crumpets',
      price: 350,
      provider: 'Restaurent-4',
      imgSrc: '/assets/meals/Crab-and-cucumber-crumpets.jpg'
    },
    {
      id: 'beetroot-feta-grain-salad',
      createdAt: 1670694317257,
      name: 'Beetroot, feta & grain salad',
      price: 250,
      provider: 'Restaurent-5',
      imgSrc: '/assets/meals/beetroot-feta-grain-salad.jpg'
    }
  ]

  constructor() { }

  getMeals(): Meal[] {
    return this.meals;
  }
}
