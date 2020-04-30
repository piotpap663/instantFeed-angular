import { NgRedux } from '@angular-redux/store';
import { AfterViewChecked, Component, OnInit } from '@angular/core';

import { setPosts } from '../../actions/posts.js';
import { ApiCallService } from '../api-call.service';
import { IAppState } from '../app.module';

@Component({
  selector: 'app-posts-wrapper',
  templateUrl: './posts-wrapper.component.html',
  styleUrls: ['./posts-wrapper.component.scss'],
})
export class PostsWrapperComponent implements OnInit, AfterViewChecked {
  subscribers;
  userId;
  posts;
  constructor(
    private apiCall: ApiCallService,
    private ngRedux: NgRedux<IAppState>,
  ) { }

  ngOnInit(): void {
    this.ngRedux.select(['auth', 'subscribers']).subscribe(sub => {
      this.subscribers = sub;
    });
    this.ngRedux.select(['auth', 'id']).subscribe(id => {
      this.userId = id;
    });
    this.ngRedux.select(['posts']).subscribe(p => {
      this.posts = p;
    });
    if (this.userId && this.subscribers) {
      this.apiCall.getUserPostSubscribersPostLikedBySubscribersPost(this.subscribers, this.userId)
        .then((response: any) => {
          this.ngRedux.dispatch(setPosts(response));
        }
        );
    }
  }
  ngAfterViewChecked() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

}
