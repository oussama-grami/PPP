import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanneauxComponent } from './panneaux.component';

describe('PanneauxComponent', () => {
  let component: PanneauxComponent;
  let fixture: ComponentFixture<PanneauxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanneauxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanneauxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
