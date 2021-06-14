import { GunService } from 'src/app/services/gun-service.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {
  CREATE_SUCCESS,
  UPDATE_SUCCESS,
} from 'src/app/constant/repsond-status';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css'],
})
export class CategoryEditComponent implements OnInit {
  editMode = false;

  categoryForm: FormGroup = this.fb.group({
    id: [null],
    name: ['', Validators.required],
  });

  constructor(
    private route: ActivatedRoute,
    private gunService: GunService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      if (!params['id']) return;
      let existingCategory = this.gunService.getCategoryById(params['id']);
      if (existingCategory) {
        this.mapToForm(existingCategory);
      }
    });
  }

  mapToForm(existingCategory: Category): void {
    const { id, name } = existingCategory;
    this.categoryForm.patchValue({
      id,
      name,
    });
  }

  onSubmit(form: FormGroup) {
    if (!form.valid) {
      this.toastr.error('Chưa điền tên cho danh mục này', 'Thất bại !');
      return;
    }
    this.gunService.postCategory(form.value).then((res) => {
      switch (res) {
        case CREATE_SUCCESS:
          form.reset();
          this.toastr.success(
            'Đã thêm danh mục vào kho "hàng"',
            'Thành công !'
          );
          break;
        case UPDATE_SUCCESS:
          form.reset();
          this.toastr.success(
            'Đã chỉnh sửa danh mục trong kho "hàng"',
            'Thành công !'
          );
          break;
        default:
          this.toastr.error(
            'Thêm danh mục vào kho "hàng" đã không xảy ra suôn sẻ',
            'Thất bại !'
          );
          break;
      }
    });
  }

  onCancel() {
    this.router.navigate(['/category'], { relativeTo: this.route });
  }
}
