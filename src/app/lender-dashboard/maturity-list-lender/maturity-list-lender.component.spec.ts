import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaturityListLenderComponent } from './maturity-list-lender.component';

describe('MaturityListLenderComponent', () => {
  let component: MaturityListLenderComponent;
  let fixture: ComponentFixture<MaturityListLenderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaturityListLenderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaturityListLenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
