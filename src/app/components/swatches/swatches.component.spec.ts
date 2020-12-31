import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwatchesComponent } from './swatches.component';

describe('SwatchesComponent', () => {
  let component: SwatchesComponent;
  let fixture: ComponentFixture<SwatchesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwatchesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwatchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
