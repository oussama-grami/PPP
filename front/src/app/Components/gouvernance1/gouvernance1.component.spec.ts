import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Gouvernance1Component } from './gouvernance1.component';

describe('Gouvernance1Component', () => {
  let component: Gouvernance1Component;
  let fixture: ComponentFixture<Gouvernance1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Gouvernance1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Gouvernance1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
