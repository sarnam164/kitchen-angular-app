import { Subject } from 'rxjs';
import { Ingredient } from './../shared/ingredient.model';
import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipesChanged=new Subject<Recipe[]>();

  private recipes:Recipe[]=[
    new Recipe("Chicken Fry",
    "A tasty plate of deep fried Chicken Pieces",
    "https://i.ytimg.com/vi/gDyHEnIMZJA/maxresdefault.jpg",
    [
      new Ingredient('Chicken',6),
      new Ingredient('Masala',1),
      new Ingredient('Oil',1)
    ]),
    new Recipe("Egg Noodle",
    "Instant Meal to satisfy your hunger",
    "https://www.diversivore.com/wp-content/uploads/2018/02/Chinese-Egg-Noodles-square_small.jpg",
    [
      new Ingredient('Flour',1),
      new Ingredient('Egg',1)
    ])
  ];
  constructor(private slService:ShoppingListService) { }

  getRecipes(){
    return this.recipes.slice();
  }

  getRecipe(index:number){
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredient:Ingredient[]){
    this.slService.addAllIngredients(ingredient);
  }

  addRecipe(recipe:Recipe){
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index:number, newRecipe:Recipe){
    this.recipes[index]=newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index:number){
    this.recipes.splice(index,1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
