import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userEmail: string;
  userPassword: string;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {

  }

  login() {
    this.router.navigate(['home']);
    // this.authService.validate(this.userEmail, this.userPassword)
    //   .then((response) => {
    //     this.authService.setUserInfo({ user: response['user'] });

    //   })
  }

}
