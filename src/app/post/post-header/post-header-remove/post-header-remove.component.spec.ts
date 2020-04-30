import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostHeaderRemoveComponent } from './post-header-remove.component';

describe('PostHeaderRemoveComponent', () => {
  let component: PostHeaderRemoveComponent;
  let fixture: ComponentFixture<PostHeaderRemoveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostHeaderRemoveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostHeaderRemoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
