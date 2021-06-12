import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CateService } from '../category.service';
import { ToastrService } from 'ngx-toastr';

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

    if (!this.cateForm.get('id_cate').value && !this.cateForm.get('name_cate').value) { this.toastr.error('The form can not null', 'Error message') }
    else if (!this.cateForm.get('id_cate').value) { this.toastr.error('Id of category can not null', 'Error message') }
    else if (!this.cateForm.get('name_cate').value) { this.toastr.error('Name of category can not null', 'Error message') }
    else if (this.editMode) {
      this.cateService.updateCate(this.id, this.cateForm.value);
      this.toastr.success('Successfully edit item has id: ' + this.cateForm.get('id_cate').value + ' new category', 'Successful message')
      this.onCancel();
    } else {
      this.cateService.addCate(this.cateForm.value);
      this.toastr.success('Successfully added new category', 'Successful message')
      this.onCancel();
    }
  }

  onCancel() {
    this.router.navigate(['/category'], { relativeTo: this.route });
  }

}