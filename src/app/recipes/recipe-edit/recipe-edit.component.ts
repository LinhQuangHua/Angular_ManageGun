import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }
  private initForm() {
    let recipeName = '';
    let recipeID = '';
    let recipePrice = '';
    let recipeDescription = '';

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe?.name;
      recipeID = recipe?.id;
      recipePrice = recipe?.price;
      recipeDescription = recipe?.description;

    }
    this.recipeForm = new FormGroup({

      name: new FormControl(recipeName, Validators.required),
      id: new FormControl(recipeID, Validators.required),
      price: new FormControl(recipePrice, Validators.required),
      description: new FormControl(recipeDescription, Validators.required),

    });
  }


  onSubmit() {
    if (!this.recipeForm.get('id').value
      && !this.recipeForm.get('name').value
      && !this.recipeForm.get('price').value
      && !this.recipeForm.get('description').value) { window.alert("The form can' t null!") }
    else if (!this.recipeForm.get('id').value
      || !this.recipeForm.get('name').value
      || !this.recipeForm.get('price').value
      || !this.recipeForm.get('description').value) { window.alert("Gun' information fields can' t null!") }
    else if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
      this.onCancel();
    }
    else {
      this.recipeService.addRecipe(this.recipeForm.value);
      this.onCancel();
    }
  }

  onCancel() {
    this.router.navigate(['/gun'], { relativeTo: this.route });
  }

}