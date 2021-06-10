import { Component, OnInit } from '@angular/core';
import { Category } from './category.model';
import { CateService } from './category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  constructor(private cateService: CateService) { }
  selectedCate: Category;
  ngOnInit() {
    this.cateService.cateSelected.subscribe((cate: Category) => {
      this.selectedCate = cate;
    });
  }
}
