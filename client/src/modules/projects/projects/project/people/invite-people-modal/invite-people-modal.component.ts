import { Component, Injector, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { UtilityService } from 'src/modules/shared/services/utility.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-invite-people-modal',
  templateUrl: './invite-people-modal.component.html',
  styleUrls: ['./invite-people-modal.component.scss']
})
export class InvitePeopleModalComponent implements OnInit {

  constructor(private _Router: Router, private _Injector: Injector, private _SnackBar: MatSnackBar) { }

  // Email Variable
  email: any

  // Message Variable
  message: any

  // Link Variable
  link: any = environment.BASE_URL + this._Router.url.replace('/people', '')

  ngOnInit(): void {
    this.setDefaultMessage()
  }

  copyToClipboard() {
    let utilityService = this._Injector.get(UtilityService)
    utilityService.copyMessage(this.link)
    this._SnackBar.open('Copied to Clipboard! 🎉', '', {
      duration: 1500,
      panelClass: ['black-snackbar']
    })
  }

  setDefaultMessage() {
    this.message =
      `Hello, 
    
I'd like you to join our project on CoffeeTrace. 
    
Together let's stay connected and share updates & events in real time! 
    
Please click the following link and follow instructions to join!

Kind Regards,
${JSON.parse(sessionStorage.getItem('user') + "")['first_name']}`
  }

}
