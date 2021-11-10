import { Component, Injector, OnInit } from '@angular/core';
import { UtilityService } from 'src/modules/shared/services/utility.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private _Injector: Injector) { }

  // Project Details
  project: any = {}

  // Utility Service
  utilityService = this._Injector.get(UtilityService)

  async ngOnInit() {
    this.project = await this.utilityService.getProject()
  }

}
