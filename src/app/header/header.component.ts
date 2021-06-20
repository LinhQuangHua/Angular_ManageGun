import { AuthService } from './../services/auth-service.service.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Output() featureSelected = new EventEmitter<string>();
  currentUser: User;
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService
      .getCurrentUser()
      .subscribe((currentUser) => (this.currentUser = currentUser));
  }
}
