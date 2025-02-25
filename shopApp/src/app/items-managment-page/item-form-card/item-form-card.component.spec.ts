import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemFormCardComponent } from './item-form-card.component';

describe('ItemFormCardComponent', () => {
  let component: ItemFormCardComponent;
  let fixture: ComponentFixture<ItemFormCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemFormCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemFormCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
