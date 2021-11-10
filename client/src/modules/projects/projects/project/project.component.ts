import { Component, Injector, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectsService } from 'src/modules/shared/services/projects.service';
import { UtilityService } from 'src/modules/shared/services/utility.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private _Injector: Injector, private _Router: Router) { }

  // Project ID
  projectId = this.activatedRoute.snapshot.paramMap.get('id')

  // Projects Service
  projectsService = this._Injector.get(ProjectsService)

  // Utility Service
  utilityService = this._Injector.get(UtilityService)

  // Project
  project: any = {}

  // Selected Route
  selectedRoute = 'plantation'

  async ngOnInit() {
    
    // Fetch Project
    this.project = await this.getProject(this.projectId)

    // Set the Highlighted tab value
    this.selectedRoute = this._Router.url.split('/')[this._Router.url.split('/').length-1]

    // Send the update through observable
    this.utilityService.updateProject(this.project)
  }

  /**
   * Service function to fetch project details
   * @param projectName 
   * @returns project details
   */
  getProject(projectId: any){
    return new Promise((resolve, reject)=>{
      this.projectsService.getProject(projectId)
      .then((res: any)=>{
        resolve(res['project'])
      })
      .catch((err)=>{
        console.error("Error - Fetch Project Details API :", err)
        reject([])
      })
    })
  }

  ngOnDestroy(){
    this.utilityService.updateProject({})
  }

}
