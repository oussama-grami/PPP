import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Environnement3Component } from './environnement3.component';

describe('Environnement3Component', () => {
  let component: Environnement3Component;
  let fixture: ComponentFixture<Environnement3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Environnement3Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Environnement3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
