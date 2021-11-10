import { Component, Injector, OnInit } from '@angular/core';
import { UtilityService } from 'src/modules/shared/services/utility.service';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss']
})
export class FilesComponent implements OnInit {

  constructor(private _Injector: Injector) { }

  // Project Details
  project: any = {}

  // Utility Service
  utilityService = this._Injector.get(UtilityService)

  async ngOnInit() {
    this.project = await this.utilityService.getProject()
  }

}
