import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ESGdiagramComponent } from './esgdiagram.component';

describe('ESGdiagramComponent', () => {
  let component: ESGdiagramComponent;
  let fixture: ComponentFixture<ESGdiagramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ESGdiagramComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ESGdiagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
