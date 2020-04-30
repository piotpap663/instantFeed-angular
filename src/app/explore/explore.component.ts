import { NgRedux } from '@angular-redux/store';
import { AfterViewChecked, Component, OnInit } from '@angular/core';

import { setPosts } from '../../actions/posts.js';
import { ApiCallService } from '../api-call.service';
import { IAppState, PostsState } from '../app.module';

@Component({
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit, AfterViewChecked {
  subscribers: Array<string> = [];
  userId: string;
  posts: Array<PostsState>;
  constructor(
    private apiCall: ApiCallService,
    private ngRedux: NgRedux<IAppState>,
  ) { }

  ngOnInit(): void {
    this.ngRedux.select(['auth', 'subscribers']).subscribe((sub: string[]) => {
      this.subscribers = sub;
    });
    this.ngRedux.select(['auth', 'id']).subscribe((id: string) => {
      this.userId = id;
    });
    this.ngRedux.select(['posts']).subscribe((p: Array<PostsState>) => {
      this.posts = p;
    });
    if (this.userId && this.subscribers) {
      this.apiCall.getAllPostsExceptUser(this.subscribers, this.userId)
        .then((response: any) => {
          this.ngRedux.dispatch(setPosts(response));
        });
    }
  }
  ngAfterViewChecked() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
}
