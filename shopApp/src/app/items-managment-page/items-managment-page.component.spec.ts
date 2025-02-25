import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsManagmentPageComponent } from './items-managment-page.component';

describe('ItemsManagmentPageComponent', () => {
  let component: ItemsManagmentPageComponent;
  let fixture: ComponentFixture<ItemsManagmentPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemsManagmentPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemsManagmentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
