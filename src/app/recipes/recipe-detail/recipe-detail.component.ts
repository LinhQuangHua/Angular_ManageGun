import { Gun } from './../../models/gun';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { GunService } from 'src/app/services/gun-service.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  gunId: string;
  gun: Gun;

  constructor(
    private gunService: GunService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.gunId = params['id'];
      this.gun = this.gunService.getGunById(this.gunId);
    });
  }

  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDeleteRecipe() {
    this.gunService.deleteGun(this.gunId);
    this.router.navigate(['/gun']);
  }
}
