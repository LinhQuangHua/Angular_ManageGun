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
    let cateName = '';
    let cateID = '';

    if (this.editMode) {
      const cate = this.cateService.getCate(this.id);
      cateName = cate?.name_cate;
      cateID = cate?.id_cate;

    }
    this.cateForm = new FormGroup({

      name_cate: new FormControl(cateName, Validators.required),
      id_cate: new FormControl(cateID, Validators.required),

    });
  }

  onSubmit() {
    if (this.editMode) {
      this.cateService.updateCate(this.id, this.cateForm.value);
    } else {
      this.cateService.addCate(this.cateForm.value);
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['/category'], { relativeTo: this.route });
  }

}