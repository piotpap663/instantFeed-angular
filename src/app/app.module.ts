import { DevToolsExtension, NgRedux, NgReduxModule } from '@angular-redux/store';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { combineReducers } from 'redux';

import authReducer from '../reducers/auth.js';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EntryPageComponent } from './entry-page/entry-page.component';
import { LoginComponent } from './login/login.component';
import { PostComponent } from './post/post.component';
import { RootComponent } from './root/root.component';

export interface AuthState {
  user: {};
  id: string;
  permission: string;
  subscribers: [];
}
export interface IAppState {
  auth: AuthState;
}
const rootReducer = combineReducers<IAppState>({
  auth: authReducer,
});

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    EntryPageComponent,
    LoginComponent,
    RootComponent,
    PostComponent
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
    // ngRedux.configureStore(rootReducer,
    //   undefined,
    //   // compose((window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__())
    // );
    let enhancers = [];
    // ... add whatever other enhancers you want.

    // You probably only want to expose this tool in devMode.
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
