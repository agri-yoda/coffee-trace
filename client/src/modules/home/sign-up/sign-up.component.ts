import { Component, OnInit, Injector } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { emailRegex } from 'src/modules/shared/configs/email-regex'
import { AuthService } from 'src/modules/shared/services/auth.service'

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  constructor(
    private _FormBuilder: FormBuilder,
    private _Injector: Injector,
    private _Router: Router,
    private _Route: ActivatedRoute
  ) { }

  // Form
  form: any

  // Redirect URL
  redirectURL: any

  ngOnInit() {

    // Initiliase the form 
    this.form = this._FormBuilder.group({
      email: [null, [Validators.required, Validators.pattern(emailRegex)]],
      first_name: [null, Validators.required],
      last_name: [null, Validators.required],
      password: [null, Validators.required],
      confirm: [null, Validators.required],
      terms: [null, Validators.required],
      type: [null, Validators.required]
    })
  }

  async createAccount() {
    if (!this.form.valid) {
      return;
    }
    let user = await this.signUp(this.form.value)
      .then((res: any) => {
        let user = res['user']
        let token = res['token']
        sessionStorage.setItem('token', token)
        sessionStorage.setItem('user', JSON.stringify(user))
        this.redirectUser()
      })
  }

  signUp(userData: any) {
    return new Promise((resolve, reject) => {
      let authService = this._Injector.get(AuthService)
      authService.signUp(userData)
        .then((res: any) => {
          resolve(res)
        })
        .catch((err) => {
          reject({})
        })
    })
  }

  redirectUser() {
    let params = this._Route.snapshot.queryParams
    if (params['redirectURL']) {
      this.redirectURL = params['redirectURL']
    }
    if (this.redirectURL) {
      this._Router.navigateByUrl(this.redirectURL)
        .catch(() => this._Router.navigate(['/dashboard']))
    } else {
      this._Router.navigate(['/dashboard'])
    }
  }

}
