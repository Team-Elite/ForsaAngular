import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaturitylistComponent } from './maturitylist.component';

describe('MaturitylistComponent', () => {
  let component: MaturitylistComponent;
  let fixture: ComponentFixture<MaturitylistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaturitylistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaturitylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
