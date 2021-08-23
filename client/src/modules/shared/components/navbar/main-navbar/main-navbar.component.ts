import { Component, Injector, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/modules/shared/services/auth.service';

@Component({
  selector: 'app-main-navbar',
  templateUrl: './main-navbar.component.html',
  styleUrls: ['./main-navbar.component.scss']
})
export class MainNavbarComponent implements OnInit {

  constructor(
    private _Injector: Injector,
    private _Router: Router
  ) { }

  // User Details
  user: any

  ngOnInit(): void {

    this.user = JSON.parse(sessionStorage.getItem('user')+"")

    console.log(this.user)
  }

  async logout() {
    return new Promise((resolve, reject)=>{
      let authService = this._Injector.get(AuthService)
      authService.signout()
      .then((res)=>{
        this.redirectUser()
        sessionStorage.clear()
        resolve(res)
      })
      .catch((err)=>{
        reject(err)
      })
    })
  }

  redirectUser() {
    this._Router.navigate(['/home/login'])
  }

}
