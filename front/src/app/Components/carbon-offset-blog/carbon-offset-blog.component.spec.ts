import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarbonOffsetBlogComponent } from './carbon-offset-blog.component';

describe('CarbonOffsetBlogComponent', () => {
  let component: CarbonOffsetBlogComponent;
  let fixture: ComponentFixture<CarbonOffsetBlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarbonOffsetBlogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarbonOffsetBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
