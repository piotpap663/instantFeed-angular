import { DevToolsExtension, NgRedux, NgReduxModule } from '@angular-redux/store';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { combineReducers } from 'redux';

import authReducer from '../reducers/auth.js';
import postsReducer from '../reducers/posts.js';
import { AddPostComponent } from './add-post/add-post.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app/app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EntryPageComponent } from './entry-page/entry-page.component';
import { ExploreComponent } from './explore/explore.component';
import { HeaderComponent } from './header/header.component';
import { PostContentComponent } from './post/post-content/post-content.component';
import { PostHeaderRemoveComponent } from './post/post-header/post-header-remove/post-header-remove.component';
import { PostHeaderComponent } from './post/post-header/post-header.component';
import { PostInfoComponent } from './post/post-info/post-info.component';
import { PostComponent } from './post/post.component';
import { PostsWrapperComponent } from './posts-wrapper/posts-wrapper.component';
import { UserPageComponent } from './user-page/user-page.component';

export interface AuthState {
  user: string;
  id: string;
  permission: string;
  subscribers: [];
}
export interface PostsState {
  images: [];
  likes: string[];
  comments: [];
  _id: string;
  authorId: string;
  likeCounter: number;
  text: string;
  created_at: string;
  user: {};
  liked: boolean;
}
export interface IAppState {
  auth: AuthState;
  posts: PostsState;
}
const rootReducer = combineReducers<IAppState>({
  auth: authReducer,
  posts: postsReducer
});

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    EntryPageComponent,
    PostComponent,
    PostsWrapperComponent,
    PostHeaderComponent,
    PostHeaderRemoveComponent,
    PostContentComponent,
    PostInfoComponent,
    AddPostComponent,
    ExploreComponent,
    UserPageComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgReduxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(ngRedux: NgRedux<IAppState>, private devTools: DevToolsExtension) {
    let enhancers = [];
    if (devTools.isEnabled()) {
      enhancers = [...enhancers, devTools.enhancer()];
    }
    ngRedux.configureStore(
      rootReducer,
      undefined,
      [],
      enhancers);
  }
}
