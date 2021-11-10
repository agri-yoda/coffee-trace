import { Component, Injector, OnInit } from '@angular/core';
import { UtilityService } from 'src/modules/shared/services/utility.service';

@Component({
  selector: 'app-coffee',
  templateUrl: './coffee.component.html',
  styleUrls: ['./coffee.component.scss']
})
export class CoffeeComponent implements OnInit {

  constructor(private _Injector: Injector) { }

  // Project Details
  project: any = {}

  // Utility Service
  utilityService = this._Injector.get(UtilityService)

  async ngOnInit() {
    this.project = await this.utilityService.getProject()
  }

}
