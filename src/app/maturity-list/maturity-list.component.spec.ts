import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaturityListComponent } from './maturity-list.component';

describe('MaturityListComponent', () => {
  let component: MaturityListComponent;
  let fixture: ComponentFixture<MaturityListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaturityListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaturityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
