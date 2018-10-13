import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForsaLanguagesComponent } from './forsa-languages.component';

describe('ForsaLanguagesComponent', () => {
  let component: ForsaLanguagesComponent;
  let fixture: ComponentFixture<ForsaLanguagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForsaLanguagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForsaLanguagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
