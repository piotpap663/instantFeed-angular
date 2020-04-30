import { NgRedux, select } from '@angular-redux/store';
import { Component, OnInit } from '@angular/core';

import { IAppState } from '../app.module';

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor(private ngRedux: NgRedux<IAppState>) { }

  @select(['auth', 'user']) user;

  ngOnInit(): void {

    // setTimeout(() => {
    //   this.ngRedux.dispatch({ type: 'LOGIN', user: 5 });
    // }, 3000);
  }
  callRedux() {

  }

}
