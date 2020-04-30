import { NgRedux } from '@angular-redux/store';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { login } from '../../actions/auth.js';
import { ApiCallService } from '../api-call.service.js';
import { IAppState } from '../app.module';

@Component({
  templateUrl: './entry-page.component.html',
  styleUrls: ['./entry-page.component.scss']
})
export class EntryPageComponent {
  constructor(
    private ngRedux: NgRedux<IAppState>,
    private router: Router,
    private apiCall: ApiCallService
  ) { }
  userName: string;
  userPassword: string;
  showLoginPage = true;

  handleChangeName = event => {
    this.userName = event.target.value;
  }
  handleChangePassword = event => {
    this.userPassword = event.target.value;
  }
  switchToLoginOrRegister() {
    this.showLoginPage = !this.showLoginPage;
  }
  updateUserInRedux(user, id, permission, subscribers) {
    this.ngRedux.dispatch(
      login(user, id, permission, subscribers)
    );
    this.router.navigate(['dashboard']);
  }

  login() {
    this.apiCall.loginUser(this.userName, this.userPassword)
      .then((response: any) => {
        if (response && response.info) {
          alert(response.info || 'Nieprawidłowe dane');
        } else {
          this.updateUserInRedux(
            response.user,
            response._id,
            response.permission,
            response.subscribers
          );
        }
      });
  }
  register() {
    this.apiCall.registerUser(this.userName, this.userPassword)
      .then((response: any) => {
        if (response && response.info) {
          alert(response.info || 'Nieprawidłowe dane');
        } else {
          this.updateUserInRedux(
            response.user,
            response._id,
            response.permission,
            response.subscribers
          );
        }
      });
  }
}
