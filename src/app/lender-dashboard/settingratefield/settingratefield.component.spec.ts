import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingratefieldComponent } from './settingratefield.component';

describe('SettingratefieldComponent', () => {
  let component: SettingratefieldComponent;
  let fixture: ComponentFixture<SettingratefieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingratefieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingratefieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
