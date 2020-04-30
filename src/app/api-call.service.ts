import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import {
  ENDPOINT_ADD_POST,
  ENDPOINT_GET_ALL_POSTS_EXCEPT_USER,
  ENDPOINT_GET_POSTS,
  ENDPOINT_GET_USER_POSTS,
  ENDPOINT_GET_USER_SUBSCRIBERS,
  ENDPOINT_LIKE,
  ENDPOINT_LOGOUT,
  ENDPOINT_REGISTER,
  ENDPOINT_SUBSCRIBE_USER,
  ENDPOINT_UNSUBSCRIBE_USER,
  ENPOINT_REMOVE_POST,
} from '../config.js';

@Injectable({
  providedIn: 'root'
})
export class ApiCallService {

  constructor(private http: HttpClient) { }


  getPostsByUserId = (subscribers, userId) => this.http.get(ENDPOINT_GET_POSTS, {
    params: {
      subscribers: [...subscribers, userId],
      userId
    }
  }).toPromise()

  getAllPostsExceptUser = (subscribers, userId) => this.http.get(ENDPOINT_GET_ALL_POSTS_EXCEPT_USER, {
    params: {
      userId
    }
  }).toPromise()

  removePostById = (postId) => this.http.post(ENPOINT_REMOVE_POST, {
    params: {
      postId
    }
  }).toPromise()

  getUserSubscribers = (userId) => this.http.get(ENDPOINT_GET_USER_SUBSCRIBERS, {
    params: {
      userId
    }
  }).toPromise()

  logoutUser = () => this.http.get(ENDPOINT_LOGOUT).toPromise();

  loginUser = (user, password) => this.http.post('http://localhost:3000/api/login', {
    user,
    password
  }).toPromise()

  registerUser = (user, password) => this.http.post(ENDPOINT_REGISTER, {
    user,
    password
  }).toPromise()

  likePost = (userId, id) => this.http.post(ENDPOINT_LIKE, {
    params: {
      userId,
      postId: id
    }
  }).toPromise()

  getUserPostSubscribersPostLikedBySubscribersPost = (subscribers, userId) => {
    return this.http.get(ENDPOINT_GET_POSTS, {
      params: {
        subscribers: [...subscribers, userId],
        userId
      }
    }).toPromise();
  }

  getUserPosts = (subscribers, userId, visitedUserId) => {
    return this.http.get(ENDPOINT_GET_USER_POSTS, {
      params: {
        userId: visitedUserId
      }
    }).toPromise();
  }

  unsubscribeUser = (postAuthorId, userId) => {
    return this.http.post(ENDPOINT_UNSUBSCRIBE_USER, {
      params: {
        subscriber: postAuthorId,
        authorId: userId
      }
    }).toPromise();
  }


  subscribeUser = (postAuthorId, userId) => {
    return this.http.post(ENDPOINT_SUBSCRIBE_USER, {
      params: {
        subscriber: postAuthorId,
        authorId: userId
      }
    }).toPromise();
  }


  addPost = (data) => {
    const config = {
      headers: {
        'content-type': 'application/json; charset=utf-8'
      },
    };
    return this.http.post(ENDPOINT_ADD_POST,
      data, config).toPromise();
  }

}
