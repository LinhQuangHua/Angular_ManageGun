import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();
  private recipes: Recipe[] = [
    new Recipe(
      'Pistol-0001',
      'Beretta 92a',
      'Western Europe, Eastern Europe, Middle East & North Africa, Sub-Saharan Africa, Central Asia, South Asia, East Asia, Pacific, North America, Central America, South America',
      'Price: $1400',
      'http://www.smallarmssurvey.org/fileadmin/img/weapons-id/SAS-weapons-pistol-beretta-92.jpg'
    ),
    new Recipe(
      'Pistol-0002',
      '92FS',
      'Western Europe, Eastern Europe, Middle East & North Africa, Sub-Saharan Africa, Central Asia, South Asia, East Asia, Pacific, North America, Central America, South America',
      'Price: $1000',
      'http://www.smallarmssurvey.org/fileadmin/img/weapons-id/SAS-weapons-pistol-colt-m1911.jpg'
    ),
    new Recipe(
      'Pistol-0003',
      '92G',
      'Western Europe, Eastern Europe, Middle East & North Africa, Sub-Saharan Africa, Central Asia, South Asia, East Asia, Pacific, North America, Central America, South America',
      'Price: $800',
      'http://www.smallarmssurvey.org/fileadmin/img/weapons-id/SAS-weapons-pistol-glock.jpg'
    ),
    new Recipe(
      'Pistol-0004',
      'Beretta 92a-12',
      'Western Europe, Eastern Europe, Middle East & North Africa, Sub-Saharan Africa, Central Asia, South Asia, East Asia, Pacific, North America, Central America, South America',
      'Price: $1500',
      'http://www.smallarmssurvey.org/fileadmin/img/weapons-id/SAS-weapons-pistol-beretta-92.jpg'
    ),
    new Recipe(
      'Pistol-0005',
      '92FS-2',
      'Western Europe, Eastern Europe, Middle East & North Africa, Sub-Saharan Africa, Central Asia, South Asia, East Asia, Pacific, North America, Central America, South America',
      'Price: $12000',
      'http://www.smallarmssurvey.org/fileadmin/img/weapons-id/SAS-weapons-pistol-colt-m1911.jpg'
    ),
    new Recipe(
      'Pistol-0006',
      '92G-T74',
      'Western Europe, Eastern Europe, Middle East & North Africa, Sub-Saharan Africa, Central Asia, South Asia, East Asia, Pacific, North America, Central America, South America',
      'Price: $1800',
      'http://www.smallarmssurvey.org/fileadmin/img/weapons-id/SAS-weapons-pistol-glock.jpg'
    ),
    new Recipe(
      'Pistol-0007',
      '92G',
      'Western Europe, Eastern Europe, Middle East & North Africa, Sub-Saharan Africa, Central Asia, South Asia, East Asia, Pacific, North America, Central America, South America',
      'Price: $800',
      'http://www.smallarmssurvey.org/fileadmin/img/weapons-id/SAS-weapons-pistol-glock.jpg'
    ),
    new Recipe(
      'Pistol-0008',
      'Beretta 92a-12',
      'Western Europe, Eastern Europe, Middle East & North Africa, Sub-Saharan Africa, Central Asia, South Asia, East Asia, Pacific, North America, Central America, South America',
      'Price: $1500',
      'http://www.smallarmssurvey.org/fileadmin/img/weapons-id/SAS-weapons-pistol-beretta-92.jpg'
    ),
    new Recipe(
      'Pistol-0009',
      '92FS-2',
      'Western Europe, Eastern Europe, Middle East & North Africa, Sub-Saharan Africa, Central Asia, South Asia, East Asia, Pacific, North America, Central America, South America',
      'Price: $12000',
      'http://www.smallarmssurvey.org/fileadmin/img/weapons-id/SAS-weapons-pistol-colt-m1911.jpg'
    ),
    new Recipe(
      'Pistol-0010',
      '92G-T74',
      'Western Europe, Eastern Europe, Middle East & North Africa, Sub-Saharan Africa, Central Asia, South Asia, East Asia, Pacific, North America, Central America, South America',
      'Price: $1800',
      'http://www.smallarmssurvey.org/fileadmin/img/weapons-id/SAS-weapons-pistol-glock.jpg'
    ),
  ];

  constructor() { }
  getRecipes() {
    return this.recipes;
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
  }
}
