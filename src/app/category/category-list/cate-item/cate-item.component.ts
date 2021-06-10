import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Category } from '../../category.model';
import { CateService } from '../../category.service';

@Component({
  selector: 'app-cate-item',
  templateUrl: './cate-item.component.html',
  styleUrls: ['./cate-item.component.css']
})
export class CateItemComponent implements OnInit {
  @Input() cate: Category;
  @Input() index: number;

  constructor(private cateService: CateService) { }

  ngOnInit(): void {
  }

}
