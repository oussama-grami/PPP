import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArboricultureComponent } from './arboriculture.component';

describe('ArboricultureComponent', () => {
  let component: ArboricultureComponent;
  let fixture: ComponentFixture<ArboricultureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArboricultureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArboricultureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
