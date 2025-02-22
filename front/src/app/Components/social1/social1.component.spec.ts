import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Social1Component } from './social1.component';

describe('Social1Component', () => {
  let component: Social1Component;
  let fixture: ComponentFixture<Social1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Social1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Social1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
