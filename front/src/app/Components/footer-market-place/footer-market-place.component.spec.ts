import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterMarketPlaceComponent } from './footer-market-place.component';

describe('FooterMarketPlaceComponent', () => {
  let component: FooterMarketPlaceComponent;
  let fixture: ComponentFixture<FooterMarketPlaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooterMarketPlaceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterMarketPlaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
