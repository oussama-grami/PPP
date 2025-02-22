import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Gouvernance4Component } from './gouvernance4.component';

describe('Gouvernance4Component', () => {
  let component: Gouvernance4Component;
  let fixture: ComponentFixture<Gouvernance4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Gouvernance4Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Gouvernance4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
