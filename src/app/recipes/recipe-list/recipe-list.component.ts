import { Gun } from './../../models/gun';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GunService } from 'src/app/services/gun-service.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  gunList: Gun[] = [];
  pages: number = 0;

  constructor(
    private gunService: GunService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.gunService.guns.subscribe((x) => {
      this.pages = Math.floor(x.length / 10);
      this.gunList = this.gunService.pagination();
    });
  }

  onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  pagination(pageIndex: number) {
    this.gunList = this.gunService.pagination(pageIndex, undefined);
  }
}
