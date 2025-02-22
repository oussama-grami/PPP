import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Social2Component } from './social2.component';

describe('Social2Component', () => {
  let component: Social2Component;
  let fixture: ComponentFixture<Social2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Social2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Social2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
