import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';

import { IAppState } from './app.module';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private ngRedux: NgRedux<IAppState>) { }

  public isAuthenticated(): boolean {
    if (this.ngRedux.getState().auth.user) {
      return true;
    }
    return false;
  }

}
