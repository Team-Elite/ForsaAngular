import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryMaturityListLenderComponent } from './history-maturity-list-lender.component';

describe('HistoryMaturityListLenderComponent', () => {
  let component: HistoryMaturityListLenderComponent;
  let fixture: ComponentFixture<HistoryMaturityListLenderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryMaturityListLenderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryMaturityListLenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
