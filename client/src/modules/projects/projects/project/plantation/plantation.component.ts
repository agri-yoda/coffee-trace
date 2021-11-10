import { Component, Injector, OnInit } from '@angular/core';
import { UtilityService } from 'src/modules/shared/services/utility.service';

@Component({
  selector: 'app-plantation',
  templateUrl: './plantation.component.html',
  styleUrls: ['./plantation.component.scss']
})
export class PlantationComponent implements OnInit {

  constructor(private _Injector: Injector) { }

  // Project Details
  project: any = {}

  // Utility Service
  utilityService = this._Injector.get(UtilityService)

  async ngOnInit() {
    this.project = await this.utilityService.getProject()
  }

  ngOnDestroy(){
  }


  // J+PGxpYm0yD3FRO1ICI0qkkGYeK988ekHmLHGL4m
  // AKIAZGEM2CPVE6VJH3DY
}
