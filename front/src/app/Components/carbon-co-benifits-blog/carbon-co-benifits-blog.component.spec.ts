import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarbonCoBenifitsBlogComponent } from './carbon-co-benifits-blog.component';

describe('CarbonCoBenifitsBlogComponent', () => {
  let component: CarbonCoBenifitsBlogComponent;
  let fixture: ComponentFixture<CarbonCoBenifitsBlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarbonCoBenifitsBlogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarbonCoBenifitsBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
