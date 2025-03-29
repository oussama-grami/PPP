import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Gouvernance2Component } from './gouvernance2.component';

describe('Gouvernance2Component', () => {
  let component: Gouvernance2Component;
  let fixture: ComponentFixture<Gouvernance2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Gouvernance2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Gouvernance2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
