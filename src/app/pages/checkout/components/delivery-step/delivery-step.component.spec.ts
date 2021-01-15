import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryStepComponent } from './delivery-step.component';

describe('DeliveryStepComponent', () => {
  let component: DeliveryStepComponent;
  let fixture: ComponentFixture<DeliveryStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliveryStepComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
