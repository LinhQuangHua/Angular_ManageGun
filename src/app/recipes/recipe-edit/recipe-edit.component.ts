import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  checkStatus = 5;
  recipeForm: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router,
    private toastr: ToastrService,
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
    let recipeImage = '';

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe?.name;
      recipeID = recipe?.id;
      recipeImage = recipe?.image;
      recipePrice = recipe?.price;
      recipeDescription = recipe?.description;

    }
    this.recipeForm = new FormGroup({

      name: new FormControl(recipeName, Validators.required),
      id: new FormControl(recipeID, Validators.required),
      image: new FormControl(recipeImage, Validators.required),
      price: new FormControl(recipePrice, Validators.required),
      description: new FormControl(recipeDescription, Validators.required),

    });
  }


  onSubmit() {
    if (!this.recipeForm.get('id').value
      && !this.recipeForm.get('name').value
      && !this.recipeForm.get('image').value
      && !this.recipeForm.get('price').value
      && !this.recipeForm.get('description').value) {
      this.checkStatus -= 5;
      this.toastr.error('The form can not null', 'Error message')
    }
    else {
      if (!this.recipeForm.get('id').value) {
        this.checkStatus -= 1;
        this.toastr.error('Id of gun can not null', 'Error message')
      }
      if (!this.recipeForm.get('name').value) {
        this.checkStatus -= 1;
        this.toastr.error('Name of gun can not null', 'Error message')
      }
      if (!this.recipeForm.get('image').value) {
        this.checkStatus -= 1;
        this.toastr.error('Image of gun can not null', 'Error message')
      }
      if (!this.recipeForm.get('price').value) {
        this.checkStatus -= 1;
        this.toastr.error('Price of gun can not null', 'Error message')
      }
      if (!this.recipeForm.get('description').value) {
        this.checkStatus -= 1;
        this.toastr.error('Description of gun can not null', 'Error message')
      }
    }
    if (this.checkStatus != 5) {
      this.toastr.warning('Please do not leave any fields in the form blank', 'Warning message');
    }
    else {
      if (this.editMode) {
        this.recipeService.updateRecipe(this.id, this.recipeForm.value);
        this.onCancel();
      }
      else {
        this.recipeService.addRecipe(this.recipeForm.value);
        this.onCancel();
      }
    }
    this.checkStatus = 5;
  }

  onCancel() {
    this.router.navigate(['/gun'], { relativeTo: this.route });
  }

}