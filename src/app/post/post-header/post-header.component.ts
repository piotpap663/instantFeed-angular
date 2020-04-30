import { NgRedux } from '@angular-redux/store';
import { Component, Input, OnInit } from '@angular/core';
import { ApiCallService } from 'src/app/api-call.service';
import { IAppState } from 'src/app/app.module';

import { setSubscribers } from '../../../actions/auth.js';

@Component({
  selector: 'app-post-header',
  templateUrl: './post-header.component.html',
  styleUrls: ['./post-header.component.scss']
})
export class PostHeaderComponent implements OnInit {
  constructor(
    private ngRedux: NgRedux<IAppState>,
    private apiCall: ApiCallService,
  ) { }
  @Input() postId = 'X';
  @Input() postUser = { user: '', avatar: '' };
  @Input() postCreatedAt = 'X';
  @Input() postAuthorId = 'X';
  userId;
  defaultAvatar = '❤️';
  subscribers;

  ngOnInit(): void {
    this.ngRedux.select(['auth', 'subscribers']).subscribe(sub => {
      this.subscribers = sub;
    });
    this.ngRedux.select(['auth', 'id']).subscribe(id => {
      this.userId = id;
    });
  }

  handleUnsubscribe(e) {
    this.apiCall.unsubscribeUser(this.postAuthorId, this.userId).then((response: any) => {
      if (response.info) {
        console.error(response);
        alert(response.info);
      }
      const subscribers = this.subscribers.filter(subId => subId !== this.postAuthorId);
      this.ngRedux.dispatch(setSubscribers(subscribers));
    }).catch((error) => {
      console.error(error);
    });
  }
  handleSubscribe(e) {
    this.apiCall.subscribeUser(this.postAuthorId, this.userId).then((response: any) => {
      if (response.info) {
        console.error(response);
        alert(response.info);
      }
      const subscribers = [...this.subscribers, this.postAuthorId];
      this.ngRedux.dispatch(setSubscribers(subscribers));
    }).catch((error) => {
      console.error(error);
    });
  }
}
