import { EventEmitter, Injectable } from '@angular/core';
import { Category } from './category.model';

@Injectable({
    providedIn: 'root',
})
export class CateService {
    cateSelected = new EventEmitter<Category>();
    private cates: Category[] = [
        new Category(
            'Weapon-0001',
            'Gun',
        ),
        new Category(
            'Weapon-0002',
            'Boom',
        ),
        new Category(
            'Weapon-0003',
            'Armor',
        ),
        new Category(
            'Weapon-0004',
            'Rocket',
        ),
    ];

    constructor() { }
    getCates() {
        return this.cates;
    }

    getCate(index: number) {
        return this.cates[index];
    }

    addCate(cate: Category) {
        this.cates.push(cate);
    }

    updateCate(index: number, newCate: Category) {
        this.cates[index] = newCate;
    }

    deleteCate(index: number) {
        this.cates.splice(index, 1);
    }
}