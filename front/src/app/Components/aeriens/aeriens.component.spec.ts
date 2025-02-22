import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AeriensComponent } from './aeriens.component';

describe('AeriensComponent', () => {
  let component: AeriensComponent;
  let fixture: ComponentFixture<AeriensComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AeriensComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AeriensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
