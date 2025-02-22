import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropositionSocialComponent } from './proposition-social.component';

describe('PropositionSocialComponent', () => {
  let component: PropositionSocialComponent;
  let fixture: ComponentFixture<PropositionSocialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropositionSocialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropositionSocialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
