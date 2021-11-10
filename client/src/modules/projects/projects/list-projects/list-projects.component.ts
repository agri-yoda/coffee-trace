import { Component, Injector, OnInit } from '@angular/core';
import { ProjectsService } from 'src/modules/shared/services/projects.service';

@Component({
  selector: 'app-list-projects',
  templateUrl: './list-projects.component.html',
  styleUrls: ['./list-projects.component.scss']
})
export class ListProjectsComponent implements OnInit {

  constructor(private _Injector: Injector) { }

  // Projects Array
  projects: any = []

  // Projects Service
  projectsService = this._Injector.get(ProjectsService)

  async ngOnInit() {
    this.projects = await this.getFirstRecentProjects()
  }

  newProject(project: any){
    this.projects.push(project)
  }

  getFirstRecentProjects(){
    return new Promise((resolve, reject)=>{
      this.projectsService.getFirstRecentProjects()
      .then((res: any)=>{
        resolve(res['projects'])
      })
      .catch((err)=>{
        console.error("Error - Fetch Recent Projects API :", err)
        reject([])
      })
    })
  }

}
