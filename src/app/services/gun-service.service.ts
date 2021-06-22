import {
  UPDATE_SUCCESS,
  CREATE_SUCCESS,
  DELETE_SUCCESS,
  CREATE_UPDATE_DELETE_FAILED,
} from './../constant/repsond-status';
import { Gun, GunCreateEditModel } from './../models/gun';
import { Category, CategoryCreateModel } from './../models/category';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs/internal/Observable';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import { BehaviorSubject, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GunService {
  guns = new BehaviorSubject<Gun[]>([]);
  categories: Category[] = [];
  constructor(
    private angularFireStore: AngularFirestore,
    private angularFireStorage: AngularFireStorage
  ) {
    this.fetchGuns().subscribe((x) => this.guns.next(x));
    this.fetchCategories().subscribe((x) => (this.categories = x));
  }

  fetchGuns(): Observable<Gun[]> {
    return this.angularFireStore.collection<Gun>('guns').valueChanges();
  }

  pagination(pageIndex: number = 1, pageSizes: number = 10): Gun[] {
    return this.guns.value.slice(
      (pageIndex - 1) * pageSizes,
      pageSizes * pageIndex
    );
  }

  fetchCategories(): Observable<Category[]> {
    return this.angularFireStore
      .collection<Category>('categories')
      .valueChanges();
  }

  getGunById(gunId: string): Gun | undefined {
    return this.guns.value.find((x) => x.id === gunId);
  }

  getCategoryById(cateId: string): Category | undefined {
    return this.categories.find((x) => x.id === cateId);
  }

  async postGun(gunCreateModel: GunCreateEditModel): Promise<number> {
    let statusCode: number = gunCreateModel.id
      ? UPDATE_SUCCESS
      : CREATE_SUCCESS;
    const gunToBeAdd: Gun = {
      id: gunCreateModel.id ?? this.angularFireStore.createId(),
      name: gunCreateModel.name,
      price: gunCreateModel.price,
      description: gunCreateModel.description,
      category: gunCreateModel.category,
    };

    if (gunCreateModel.image instanceof File) {
      const fileRef = this.angularFireStorage.ref(gunCreateModel.image.name);
      const uploadTask = this.angularFireStorage.upload(
        gunCreateModel.image.name,
        gunCreateModel.image
      );

      await uploadTask
        .snapshotChanges()
        .pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((x) => {
              gunToBeAdd.imagePath = x;
            });
          })
        )
        .toPromise();
    }
    this.addOrUpdateGun(gunToBeAdd).catch(
      (_) => (statusCode = CREATE_UPDATE_DELETE_FAILED)
    );
    return statusCode;
  }

  async deleteGun(gunId: string): Promise<number> {
    let statusCode: number = DELETE_SUCCESS;
    let existingGun: Gun = this.getGunById(gunId);
    if (!existingGun) {
      return CREATE_UPDATE_DELETE_FAILED;
    }

    let fileRef = this.angularFireStorage.refFromURL(existingGun.imagePath);

    await fileRef
      .delete()
      .toPromise()
      .catch((err) => CREATE_UPDATE_DELETE_FAILED);

    await this.angularFireStore
      .collection<Gun>('guns')
      .doc(existingGun.id)
      .delete()
      .catch((err) => CREATE_UPDATE_DELETE_FAILED);

    return statusCode;
  }

  async postCategory(
    categoryCreateUpdateModel: CategoryCreateModel
  ): Promise<number> {
    let existingCategory = this.getCategoryById(categoryCreateUpdateModel.id);
    let statusCode: number = existingCategory ? UPDATE_SUCCESS : CREATE_SUCCESS;
    const categoryToBeAdd: CategoryCreateModel = {
      id: existingCategory?.id ?? this.angularFireStore.createId(),
      name: categoryCreateUpdateModel.name,
    };
    let addOrUpdateOperation: Promise<void> =
      this.addOrUpdateCategory(categoryToBeAdd);

    if (statusCode == UPDATE_SUCCESS) {
      addOrUpdateOperation.then((_) =>
        this.angularFireStore
          .collection<Gun>('guns', (ref) =>
            ref.where('category', '==', existingCategory.name)
          )
          .get()
          .subscribe((x) => {
            x.forEach((doc) => {
              doc.ref.update({ category: categoryCreateUpdateModel.name });
            });
          })
      );
      addOrUpdateOperation.catch(
        (_) => (statusCode = CREATE_UPDATE_DELETE_FAILED)
      );
    }
    return statusCode;
  }

  async deleteCategory(cateId: string): Promise<number> {
    let statusCode: number = DELETE_SUCCESS;
    let existingCategory: Category = this.getCategoryById(cateId);
    if (!existingCategory) {
      return CREATE_UPDATE_DELETE_FAILED;
    }

    await this.angularFireStore
      .collection<Category>('categories')
      .doc(existingCategory.id)
      .delete()
      .then((_) =>
        this.angularFireStore
          .collection<Gun>('guns', (ref) =>
            ref.where('category', '==', existingCategory.name)
          )
          .get()
          .subscribe((x) => {
            x.forEach((doc) => {
              doc.ref.update({ category: '' });
            });
          })
      )
      .catch((err) => CREATE_UPDATE_DELETE_FAILED);

    return statusCode;
  }

  addOrUpdateGun(gunToBeAdd: Gun): Promise<void> {
    return this.angularFireStore
      .collection<Gun>('guns')
      .doc(gunToBeAdd.id)
      .set(gunToBeAdd, { merge: true });
  }

  addOrUpdateCategory(categoryToBeAdd: Category): Promise<void> {
    return this.angularFireStore
      .collection<Category>('categories')
      .doc(categoryToBeAdd.id)
      .set(categoryToBeAdd, { merge: true });
  }
}
