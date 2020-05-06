import { NgRedux } from '@angular-redux/store';
import { Component, Input, OnInit } from '@angular/core';

import { setPosts } from '../../../actions/posts.js';
import { getLikedPosts } from '../../../services/helpers.js';
import { ApiCallService } from '../../api-call.service';
import { IAppState } from '../../app.module';

@Component({
  selector: 'app-post-info',
  templateUrl: './post-info.component.html',
  styleUrls: ['./post-info.component.scss']
})
export class PostInfoComponent implements OnInit {
  @Input() postId;
  @Input() postLikes;
  @Input() postAuthorId;
  @Input() postLiked;
  @Input() postComments;
  @Input() postCreatedAt;
  userId;
  posts;
  constructor(
    private ngRedux: NgRedux<IAppState>,
    private apiCall: ApiCallService
  ) { }

  ngOnInit(): void {
    this.ngRedux.select(['auth', 'id']).subscribe(id => {
      this.userId = id;
    });
    this.ngRedux.select(['posts']).subscribe(p => {
      this.posts = p;
    });
  }

  isLikedByMe = () => {
    return this.postLikes && this.postLikes.includes(this.userId);
  }

  clickLike = () => {
    this.apiCall.likePost(this.userId, this.postId).then((response: any) => {
      if (response.info) {
        console.error(response.info);
        alert(response.info);
      } else {
        const oldPosts = [...this.posts];
        const newPosts = getLikedPosts(oldPosts, this.postId, this.userId);
        this.ngRedux.dispatch(setPosts(newPosts));
      }
    }).catch((error) => {
      console.error(error);
    });
  }
}
