import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services';

@Component({
  selector: 'login-component',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  authenticated: boolean = false;
  credentials = {
    username: '',
    password: ''
  };

  constructor(private router: Router, private loginService: LoginService) {
  }

  ngOnInit() {
    localStorage.removeItem('token');
  }


  login():void {
    console.log("login form submited");
    this.loginService.authenticate(this.credentials).subscribe(data => {
      console.log(data);
      localStorage.setItem('token', data.token);
    });
  }
}
