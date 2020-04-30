import { NgRedux } from '@angular-redux/store';
import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { setPosts } from '../../actions/posts.js';
import { ApiCallService } from '../api-call.service';
import { IAppState, PostsState } from '../app.module';

@Component({
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit, AfterViewChecked {

  subscribers: Array<string> = [];
  userId: string;
  posts: Array<PostsState>;
  visitedUserId: string;
  constructor(
    private apiCall: ApiCallService,
    private ngRedux: NgRedux<IAppState>,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.visitedUserId = paramMap.get('id');
    });

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
      this.apiCall.getUserPosts(this.subscribers, this.userId, this.visitedUserId)
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
