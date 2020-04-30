import { NgRedux } from '@angular-redux/store';
import { Component, OnInit } from '@angular/core';

import { logout } from '../actions/auth.js';
import { ApiCallService } from './api-call.service';
import { IAppState } from './app.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isAuthenticated = false;
  constructor(
    private ngRedux: NgRedux<IAppState>,
    private apiCall: ApiCallService,
  ) { }

  ngOnInit(): void {
    this.ngRedux.select(['auth', 'user']).subscribe(user => {
      this.isAuthenticated = !!user;
    });
  }

  logoutUser() {
    this.apiCall.logoutUser();
    this.ngRedux.dispatch(logout());
  }

}
