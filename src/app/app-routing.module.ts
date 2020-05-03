import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddPostComponent } from './add-post/add-post.component';
import { AuthGuardService } from './auth-guard.service';
import { EntryPageComponent } from './entry-page/entry-page.component';
import { ExploreComponent } from './explore/explore.component';
import { PostsWrapperComponent } from './posts-wrapper/posts-wrapper.component';
import { UserPageComponent } from './user-page/user-page.component';

const routes: Routes = [
  { path: 'login', component: EntryPageComponent },
  { path: 'dashboard', component: PostsWrapperComponent, canActivate: [AuthGuardService] },
  { path: 'addPost', component: AddPostComponent, canActivate: [AuthGuardService] },
  { path: 'user/:id', component: UserPageComponent, canActivate: [AuthGuardService] },
  { path: 'explore', component: ExploreComponent, canActivate: [AuthGuardService] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
