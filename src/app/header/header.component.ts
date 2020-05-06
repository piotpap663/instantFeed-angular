import { NgRedux } from '@angular-redux/store';
import { Component, OnInit } from '@angular/core';

import { logout } from '../../actions/auth.js';
import { ApiCallService } from '../api-call.service';
import { IAppState } from '../app.module';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isAuthenticated = false;
  userId;
  constructor(
    private ngRedux: NgRedux<IAppState>,
    private apiCall: ApiCallService,
  ) { }

  ngOnInit(): void {
    this.ngRedux.select(['auth', 'user']).subscribe(user => {
      this.isAuthenticated = !!user;
    });
    this.ngRedux.select(['auth', 'id']).subscribe(id => {
      this.userId = id;
    });
  }

  logoutUser() {
    this.apiCall.logoutUser().then(() => {
      this.ngRedux.dispatch(logout());
    });
  }

}
