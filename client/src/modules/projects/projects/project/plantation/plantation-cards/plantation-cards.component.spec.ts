import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantationCardsComponent } from './plantation-cards.component';

describe('PlantationCardsComponent', () => {
  let component: PlantationCardsComponent;
  let fixture: ComponentFixture<PlantationCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlantationCardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantationCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
