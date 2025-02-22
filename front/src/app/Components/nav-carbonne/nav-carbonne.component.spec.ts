import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavCarbonneComponent } from './nav-carbonne.component';

describe('NavCarbonneComponent', () => {
  let component: NavCarbonneComponent;
  let fixture: ComponentFixture<NavCarbonneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavCarbonneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavCarbonneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
