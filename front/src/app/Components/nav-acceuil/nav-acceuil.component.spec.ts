import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavAcceuilComponent } from './nav-acceuil.component';

describe('NavAcceuilComponent', () => {
  let component: NavAcceuilComponent;
  let fixture: ComponentFixture<NavAcceuilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavAcceuilComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavAcceuilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
