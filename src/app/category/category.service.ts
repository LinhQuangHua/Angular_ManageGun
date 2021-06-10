import { EventEmitter, Injectable } from '@angular/core';
import { Category } from './category.model';

@Injectable({
    providedIn: 'root',
})
export class CateService {
    cateSelected = new EventEmitter<Category>();
    private cates: Category[] = [
        new Category(
            'Pistol-0001',
            'Beretta 92a',
        ),
        new Category(
            'Pistol-0002',
            '92FS',
        ),
        new Category(
            'Pistol-0003',
            '92G',
        ),
        new Category(
            'Pistol-0004',
            'Beretta 92a-12',
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