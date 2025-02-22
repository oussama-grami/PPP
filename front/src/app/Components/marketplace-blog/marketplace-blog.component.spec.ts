import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketplaceBlogComponent } from './marketplace-blog.component';

describe('MarketplaceBlogComponent', () => {
  let component: MarketplaceBlogComponent;
  let fixture: ComponentFixture<MarketplaceBlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarketplaceBlogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarketplaceBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
