import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CateItemComponent } from './cate-item.component';

describe('CateItemComponent', () => {
  let component: CateItemComponent;
  let fixture: ComponentFixture<CateItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CateItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CateItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
