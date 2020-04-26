import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  templateUrl: './entry-page.component.html',
  styleUrls: ['./entry-page.component.scss']
})
export class EntryPageComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) { }
  userName: string;
  userPassword: string;
  userEmail: string;
  showLoginPage = true;

  ngOnInit(): void {
  }

  handleChangeName = event => {
    this.userName = event.target.value;
  }
  handleChangeEmail = event => {
    this.userEmail = event.target.value;
  }
  handleChangePassword = event => {
    this.userPassword = event.target.value;
  }
  switchToLoginOrRegister() {
    this.showLoginPage = !this.showLoginPage;
  }
  login() {
    this.router.navigate(['dashboard']);
    this.authService.validate(this.userName, this.userPassword)
      .then((response) => {
        console.log(response);
        // this.authService.setUserInfo({ user: response['user'] });
      });
  }
  handleSubmit = e => {
    e.preventDefault();
    this.login();
    //   const { user, password = 'USER' } = e.target;
    //   if (user.value && password.value) {
    //     this.http.post('http://localhost:3000/api/login', {
    //       user: user.value,
    //       password: password.value
    //     }).then(response => {
    //       if (response.data.info) {
    //         alert('Nieprawidłowe dane');
    //       } else {
    //         this.props.userLoggedIn(
    //           response.data.user,
    //           response.data._id,
    //           response.data.permission,
    //           response.data.subscribers
    //         );
    //         history.push('/');
    //       }
    //     }).catch(function (error) {
    //       console.error(error);
    //       alert('Something went wrong');
    //     });
    //   } else {
    //     alert('Uzupelnij pola');
    //   }
  }
}
