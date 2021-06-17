import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    let name = '';
    let pass = '';

    this.loginForm = new FormGroup({

      username: new FormControl(name, Validators.required),
      password: new FormControl(pass, Validators.required),

    });
  }

  onLogin() {
    console.log(this.loginForm.value);
    if (this.loginForm.value['username'] === '' || this.loginForm.value['password'] === '') {
      this.toastr.error('Vui lòng nhập username và password.', 'Lỗi đăng nhập!');
    }
    else {
      if (this.loginForm.value['username'] === 'admin' && this.loginForm.value['password'] === '123456') {
        this.router.navigate(['/dashboard'], { relativeTo: this.route }).then(result => { window.location.href = '/dashboard'; });;
      }
      else {
        this.toastr.error('Sai username và password.', 'Lỗi đăng nhập!');
      }
    }
  }
}
