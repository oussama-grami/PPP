import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarboneDiagramComponent } from './carbone-diagram.component';

describe('CarboneDiagramComponent', () => {
  let component: CarboneDiagramComponent;
  let fixture: ComponentFixture<CarboneDiagramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarboneDiagramComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarboneDiagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
