import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Social3Component } from './social3.component';

describe('Social3Component', () => {
  let component: Social3Component;
  let fixture: ComponentFixture<Social3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Social3Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Social3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
