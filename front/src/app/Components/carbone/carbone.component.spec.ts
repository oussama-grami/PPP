import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarboneComponent } from './carbone.component';

describe('CarboneComponent', () => {
  let component: CarboneComponent;
  let fixture: ComponentFixture<CarboneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarboneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarboneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
