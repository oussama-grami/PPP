import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultESGComponent } from './result-esg.component';

describe('ResultESGComponent', () => {
  let component: ResultESGComponent;
  let fixture: ComponentFixture<ResultESGComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultESGComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultESGComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
