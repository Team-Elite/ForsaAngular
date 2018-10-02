import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KontactDashboardComponent } from './kontact-dashboard.component';

describe('KontactDashboardComponent', () => {
  let component: KontactDashboardComponent;
  let fixture: ComponentFixture<KontactDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KontactDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KontactDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
