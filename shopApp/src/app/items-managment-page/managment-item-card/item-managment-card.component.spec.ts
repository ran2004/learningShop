import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagmentItemCardComponent } from './item-managment-card.component';

describe('ManagmentItemCardComponent', () => {
  let component: ManagmentItemCardComponent;
  let fixture: ComponentFixture<ManagmentItemCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagmentItemCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagmentItemCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
