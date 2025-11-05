import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoiCalculator } from './roi-calculator';

describe('RoiCalculator', () => {
  let component: RoiCalculator;
  let fixture: ComponentFixture<RoiCalculator>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoiCalculator]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoiCalculator);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
