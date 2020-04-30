import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsWrapperComponent } from './posts-wrapper.component';

describe('PostsWrapperComponent', () => {
  let component: PostsWrapperComponent;
  let fixture: ComponentFixture<PostsWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostsWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
