import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Environnement4Component } from './environnement4.component';

describe('Environnement4Component', () => {
  let component: Environnement4Component;
  let fixture: ComponentFixture<Environnement4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Environnement4Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Environnement4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
