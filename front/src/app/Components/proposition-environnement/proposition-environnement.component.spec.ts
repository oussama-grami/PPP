import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropositionEnvironnementComponent } from './proposition-environnement.component';

describe('PropositionEnvironnementComponent', () => {
  let component: PropositionEnvironnementComponent;
  let fixture: ComponentFixture<PropositionEnvironnementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropositionEnvironnementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropositionEnvironnementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
