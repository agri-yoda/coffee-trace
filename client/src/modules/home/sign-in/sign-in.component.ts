import { Component, OnInit } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { emailRegex } from 'src/modules/shared/configs/email-regex'

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  constructor(
    private _FormBuilder: FormBuilder,
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
      password: [null, Validators.required]
    })
  }

  login() {
    if (!this.form.valid) {
      return;
    }
    console.log(this.form.value)
  }

  redirectUser() {
    let params = this._Route.snapshot.queryParams
    if (params['redirectURL']) {
      this.redirectURL = params['redirectURL']
    }
    if (this.redirectURL) {
      this._Router.navigateByUrl(this.redirectURL)
        .catch(() => this._Router.navigate(['/dashboard/home']))
    } else {
      this._Router.navigate(['/dashboard/home'])
    }
  }
}
