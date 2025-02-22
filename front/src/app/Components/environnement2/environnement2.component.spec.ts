import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Environnement2Component } from './environnement2.component';

describe('Environnement2Component', () => {
  let component: Environnement2Component;
  let fixture: ComponentFixture<Environnement2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Environnement2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Environnement2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
