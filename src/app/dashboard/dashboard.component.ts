import { NgRedux } from '@angular-redux/store';
import { AfterViewInit, Component, OnInit } from '@angular/core';

import { setPosts } from '../../actions/posts.js';
import { ApiCallService } from '../api-call.service';
import { IAppState } from '../app.module';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, AfterViewInit {
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
  ngAfterViewInit() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

}
