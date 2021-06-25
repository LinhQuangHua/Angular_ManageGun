import { AuthService } from './../services/auth-service.service.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private authService: AuthService
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

  async onLogin() {
    let username: string = this.loginForm.value['username'];
    let password: string = this.loginForm.value['password'];

    if (this.loginForm.value['username'] === '' || this.loginForm.value['password'] === '') {
      this.toastr.error('Vui lòng nhập username và password.', 'Lỗi đăng nhập!');
    }
    else if (this.loginForm.value['username'] != "admin@gmail.com" || this.loginForm.value['password'] != "123456") {
      this.toastr.error('Sai username và password.', 'Lỗi đăng nhập!');
    }

    await this.loginWithEmail(username, password);

  }

  async loginWithGoogle() {
    await this.authService.loginWithGoogle();
    this.router
      .navigate(['/dashboard'], { relativeTo: this.route })
      .then((result) => {
        window.location.href = '/dashboard';
      });
  }

  async loginWithEmail(email: string, password: string) {
    await this.authService.loginWithEmail(email, password);
    this.router
      .navigate(['/dashboard'], { relativeTo: this.route })
      .then((result) => {
        window.location.href = '/dashboard';
      });
  }

  // async registerWithEmail(email: string, password: string) {
  //   await this.authService.registerWithEmail(email, password).then((_) => {
  //     this.loginWithEmail(email, password);
  //   });
  // }
}
