import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BestPriceViewComponent } from './best-price-view.component';

describe('BestPriceViewComponent', () => {
  let component: BestPriceViewComponent;
  let fixture: ComponentFixture<BestPriceViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BestPriceViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BestPriceViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
