import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllPriceComponent } from './view-all-price.component';

describe('ViewAllPriceComponent', () => {
  let component: ViewAllPriceComponent;
  let fixture: ComponentFixture<ViewAllPriceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAllPriceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAllPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
