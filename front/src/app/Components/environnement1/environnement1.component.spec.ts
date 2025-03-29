import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Environnement1Component } from './environnement1.component';

describe('Environnement1Component', () => {
  let component: Environnement1Component;
  let fixture: ComponentFixture<Environnement1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Environnement1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Environnement1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
