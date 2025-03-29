import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ESGComponent } from './esg.component';

describe('ESGComponent', () => {
  let component: ESGComponent;
  let fixture: ComponentFixture<ESGComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ESGComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ESGComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
