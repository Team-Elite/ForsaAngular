import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KontactDashboardLComponent } from './kontact-dashboard-l.component';

describe('KontactDashboardLComponent', () => {
  let component: KontactDashboardLComponent;
  let fixture: ComponentFixture<KontactDashboardLComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KontactDashboardLComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KontactDashboardLComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
