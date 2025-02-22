import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImmobilisationsComponent } from './immobilisations.component';

describe('ImmobilisationsComponent', () => {
  let component: ImmobilisationsComponent;
  let fixture: ComponentFixture<ImmobilisationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImmobilisationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImmobilisationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
