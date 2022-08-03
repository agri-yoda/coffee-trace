import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent implements OnInit {

  constructor() { }

  @Input('name') name: string = 'New Project'

  @Input('archived') archived: boolean = false

  @Input('coffeeTypesCount') coffeeTypesCount: Number = 0

  ngOnInit(): void {
  }

}
