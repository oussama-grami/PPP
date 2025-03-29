import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropositionGouvernanceComponent } from './proposition-gouvernance.component';

describe('PropositionGouvernanceComponent', () => {
  let component: PropositionGouvernanceComponent;
  let fixture: ComponentFixture<PropositionGouvernanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropositionGouvernanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropositionGouvernanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
