import { NgRedux } from '@angular-redux/store';
import { Component, Input, OnInit } from '@angular/core';

import { setPosts } from '../../../../actions/posts.js';
import { ApiCallService } from '../../../api-call.service';
import { IAppState } from '../../../app.module';

@Component({
  selector: 'app-post-header-remove',
  templateUrl: './post-header-remove.component.html',
  styleUrls: ['./post-header-remove.component.scss']
})
export class PostHeaderRemoveComponent implements OnInit {
  @Input() postId;
  posts;
  constructor(
    private ngRedux: NgRedux<IAppState>,
    private apiCall: ApiCallService,

  ) { }

  ngOnInit(): void {
    this.ngRedux.select(['posts']).subscribe(p => {
      this.posts = p;
    });
  }
  removePost() {
    if (this.postId) {
      this.apiCall.removePostById(this.postId).then((response: any) => {
        if (response.info) {
          console.error(response.info);
          alert(response.info);
        } else {
          const newPosts = this.posts.filter(post => post._id !== this.postId);
          this.ngRedux.dispatch(setPosts(newPosts));
        }
      }).catch((error) => {
        console.error(error);
      });
    }
  }

}
