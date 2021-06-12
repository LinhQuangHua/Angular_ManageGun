import { GunService } from 'src/app/services/gun-service.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CateService } from '../../category.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-cate-item',
  templateUrl: './cate-item.component.html',
  styleUrls: ['./cate-item.component.css'],
})
export class CateItemComponent implements OnInit {
  @Input() cate: Category;
  @Input() index: number;
  cates: Category;
  id: number;
  constructor(
    private gunService: GunService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.cates = this.gunService.getCategoryById(params['id']);
    });
  }

  onEditCate(index) {
    this.router.navigate([index + '/edit'], { relativeTo: this.route });
  }

  onDeleteCate(index) {
    // this.gunService.deleteCate(index);
    // this.router.navigate(['/category']);
  }
}
