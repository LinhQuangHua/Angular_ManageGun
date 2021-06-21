import * as repsondStatus from './../../constant/repsond-status';
import { GunService } from 'src/app/services/gun-service.service';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Gun } from 'src/app/models/gun';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit {
  isDisplay: boolean = false;
  isEditMode: boolean = false;
  imageUrl: string = '';
  i: number = 0;

  gunForm: FormGroup = this.fb.group({
    id: [null],
    name: ['', Validators.required],
    price: ['', Validators.required],
    description: ['', Validators.required],
    category: ['', Validators.required],
    image: [''],
  });
  constructor(
    private route: ActivatedRoute,
    public gunService: GunService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      if (!params['id']) return;
      let existGun = this.gunService.getGunById(params['id']);
      if (existGun) {
        this.mapToForm(existGun);
        this.isEditMode = true;
      }
    });
  }

  mapToForm(existGun: Gun): void {
    const { id, name, price, description, category, imagePath } = existGun;
    this.imageUrl = imagePath!;
    this.gunForm.patchValue({
      id,
      name,
      price,
      description,
      category,
      image: this.imageUrl,
    });
  }

  onSubmit(form: FormGroup): void {
    //Đống code dưới sẽ trả về các field trong Form không thỏa các Validator
    //Lặp từng formControl và console.log ra error
    //Đừng xóa nha Wang :)
    if (!form.valid) {
      Object.keys(form.controls).forEach((key) => {
        const controlErrors: ValidationErrors = form.get(key).errors;
        if (controlErrors != null) {
          Object.keys(controlErrors).forEach((keyError) => {
            console.log(
              'Key control: ' +
              key +
              ', keyError: ' +
              keyError +
              ', err value: ',
              controlErrors[keyError]
            );
          });
        }
      });
    }
    //

    if (this.gunForm.value['name'] === '' || this.gunForm.value['price'] === '' || this.gunForm.value['description'] === '' || this.gunForm.value['category'] === '' || !this.imageUrl) {
      this.toastr.error('Vui lòng điền đầy đủ thông tin vào form', 'Thất bại !');
      if (this.gunForm.value['name'] === '') {
        this.toastr.error('Vui lòng điền tên súng vào form', 'Thất bại !');
      }
      if (this.gunForm.value['price'] === '') {
        this.toastr.error('Vui lòng điền giá súng vào form', 'Thất bại !');
      }
      if (this.gunForm.value['description'] === '') {
        this.toastr.error('Vui lòng điền mô tả súng vào form', 'Thất bại !');
      }
      if (this.gunForm.value['category'] === '') {
        this.toastr.error('Vui lòng chọn danh mục cho súng trong form', 'Thất bại !');
      }
      if (!this.imageUrl) {
        this.toastr.error('Chưa chọn hình cho súng', 'Thất bại !');
        return;
      }
      return;
    }

    this.gunService.postGun(form.value).then((res) => {
      switch (res) {
        case repsondStatus.CREATE_SUCCESS:
          form.reset();
          this.toastr.success('Đã thêm súng vào kho "hàng"', 'Thành công !');
          break;
        case repsondStatus.UPDATE_SUCCESS:
          form.reset();
          this.toastr.success(
            'Đã chỉnh sửa súng trong kho "hàng"',
            'Thành công !'
          );
          break;
        default:
          this.toastr.error(
            'Thêm súng vào kho "hàng" đã không xảy ra suôn sẻ',
            'Thất bại !'
          );
          break;
      }
      this.imageUrl = '';
    });
  }

  onCancel() {
    this.router.navigate(['/gun'], { relativeTo: this.route });
  }

  onCategoryChange(event: Event) {
    const element = event.currentTarget as HTMLSelectElement;
    if (element) {
      this.gunForm.patchValue({
        category: element.value,
      });
    }
  }

  onFileChange(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList !== null && fileList?.length != 0) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result as string;
      };
      reader.readAsDataURL(fileList[0]);
      this.gunForm.patchValue({
        image: fileList[0],
      });
    }
  }
}
