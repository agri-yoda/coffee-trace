import { Component, Input, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

  constructor() { }

  // SideNav as the input
  @Input() sideNav: MatSidenav

  // Is Expanded Variable for sidenav status
  isExpanded = false

  user = JSON.parse(sessionStorage.getItem('user') + "") || {}

  ngOnInit(): void {
  }

  checkEmptyObject(object: any){
    return JSON.stringify("{}") == JSON.stringify(object)
  }

}
