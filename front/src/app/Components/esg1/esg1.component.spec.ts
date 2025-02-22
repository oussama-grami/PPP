import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Esg1Component } from './esg1.component';

describe('Esg1Component', () => {
  let component: Esg1Component;
  let fixture: ComponentFixture<Esg1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Esg1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Esg1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
