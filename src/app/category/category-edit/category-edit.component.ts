import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CateService } from '../category.service';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit {
  id: number;
  cateName: string;
  cateID: string;
  editMode = false;
  cateForm: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private cateService: CateService,
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

    if (this.editMode) {
      const cate = this.cateService.getCate(this.id);
      this.cateName = cate?.name_cate;
      this.cateID = cate?.id_cate;

    }
    this.cateForm = new FormGroup({

      name_cate: new FormControl(this.cateName, Validators.required),
      id_cate: new FormControl(this.cateID, Validators.required),

    });

  }

  onSubmit() {
    // !this.cateForm.get('id_cate').value && !this.cateForm.get('name_cate').value ? window.alert("The form can' t null!") : "";
    // this.cateForm.get('id_cate').value == null ? window.alert("Category' Id can' t null!") : "";
    // this.cateForm.get('name_cate').value == null ? window.alert("Category' name can' t null!") : "";
    // console.log(this.cateForm.get('name_cate').value, this.cateForm.get('id_cate').value)
    if (!this.cateForm.get('id_cate').value && !this.cateForm.get('name_cate').value) { window.alert("The form can' t null!") }
    else if (!this.cateForm.get('id_cate').value) { window.alert("Category' Id can' t null!") }
    else if (!this.cateForm.get('name_cate').value) { window.alert("Category' name can' t null!") }
    else if (this.editMode) {
      this.cateService.updateCate(this.id, this.cateForm.value);
      this.onCancel();
    } else {
      this.cateService.addCate(this.cateForm.value);
      this.onCancel();
    }
  }

  onCancel() {
    this.router.navigate(['/category'], { relativeTo: this.route });
  }

}