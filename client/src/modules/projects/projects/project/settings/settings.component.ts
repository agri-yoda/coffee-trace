import { Component, Injector, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ProjectsService } from 'src/modules/shared/services/projects.service';
import { UtilityService } from 'src/modules/shared/services/utility.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(
    private _Router: Router,
    private _Injector: Injector
  ) { }

  // Form
  form: any

  // Project Details
  project: any = {}

  // Utility Service
  utilityService = this._Injector.get(UtilityService)

  // Projects Service
  projectsService = this._Injector.get(ProjectsService)

  // Is loading Behaviour
  isLoading$ = new BehaviorSubject(false);

  async ngOnInit() {

    // Start the Loader
    this.isLoading$.next(true)

    // Fetch the Project
    this.project = await this.utilityService.getProject()

    // Stop the Loader
    this.isLoading$.next(false)
  }

  /**
   * Save the details
   */
  async saveDetails(){

    // Project Data
    let projectData = {
      project_name: this.project.project_name,
      profile_picture: this.project.profile_picture,
      'plantation.description': this.project.plantation.description,
      'plantation.area': this.project.plantation.area,
      'plantation.altitude': this.project.plantation.altitude,
      'plantation.rainfall': this.project.plantation.rainfall,
      'plantation.description_video': this.project.plantation.description_video,
      'plantation.region_and_bio': this.project.plantation.region_and_bio
    }

    // Update the Project
    this.project = await this.callUpdateServiceFunction(projectData)

    // Update the Project Using Service Function
    this.utilityService.updateProject(this.project)

  }

  /**
   * This function removes the project
   */
  async removeProject(){
    await this.callRemoveServiceFunction()
    .then(()=>{
      this._Router.navigate(['/saas/projects/all'])
    })
  }

  /**
   * This function is responsible for archiving and unarchiving the project
   * @param status 
   */
  async changeArchiveStatus(status: boolean){
    let projectData = {
      active: status
    }

    // Update the Project
    this.project = await this.callUpdateServiceFunction(projectData)

    // Update the Project Using Service Function
    this.utilityService.updateProject(this.project)
  }

  /**
   * Service Function to update the project
   * @param projectData 
   * @returns 
   */
  callUpdateServiceFunction(projectData: any){
    return new Promise((resolve)=>{
      this.projectsService
      .updateProject(this.project._id, projectData)
      .then((res: any)=>{
        resolve(res['project'])
      })
      .catch(()=>{
        resolve(this.project)
      })
    })
  }

  /**
   * Service Function to remove the project
   * @returns 
   */
   callRemoveServiceFunction(){
    return new Promise((resolve)=>{
      this.projectsService
      .removeProject(this.project._id)
      .then((res: any)=>{
        resolve(res['project'])
      })
      .catch(()=>{
        resolve(this.project)
      })
    })
  }
}
