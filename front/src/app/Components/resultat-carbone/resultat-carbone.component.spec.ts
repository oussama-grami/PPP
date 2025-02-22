import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultatCarboneComponent } from './resultat-carbone.component';

describe('ResultatCarboneComponent', () => {
  let component: ResultatCarboneComponent;
  let fixture: ComponentFixture<ResultatCarboneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultatCarboneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultatCarboneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
