import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Social4Component } from './social4.component';

describe('Social4Component', () => {
  let component: Social4Component;
  let fixture: ComponentFixture<Social4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Social4Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Social4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
