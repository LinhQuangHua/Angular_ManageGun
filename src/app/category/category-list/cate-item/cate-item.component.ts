import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Category } from '../../category.model';
import { CateService } from '../../category.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-cate-item',
  templateUrl: './cate-item.component.html',
  styleUrls: ['./cate-item.component.css']
})
export class CateItemComponent implements OnInit {
  @Input() cate: Category;
  @Input() index: number;
  cates: Category;
  id: number;
  constructor(
    private cateService: CateService,
    private route: ActivatedRoute,
    private router: Router
  ) { }


  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.cates = this.cateService.getCate(this.id);
    });
  }

  onEditCate(index) {
    this.router.navigate([index + '/edit'], { relativeTo: this.route });
  }

  onDeleteCate(index) {
    this.cateService.deleteCate(index);
    this.router.navigate(['/category']);
  }

}
