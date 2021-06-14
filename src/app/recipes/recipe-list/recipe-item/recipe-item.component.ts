import { Gun } from './../../../models/gun';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css'],
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Gun;
  @Input() index: number;

  constructor() {}

  ngOnInit(): void {}
}
