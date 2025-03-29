import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Gouvernance3Component } from './gouvernance3.component';

describe('Gouvernance3Component', () => {
  let component: Gouvernance3Component;
  let fixture: ComponentFixture<Gouvernance3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Gouvernance3Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Gouvernance3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
