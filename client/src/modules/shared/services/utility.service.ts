import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor(private _Router: Router) { }

  // Project Data Behaviour Subject
  public projectDataSource = new BehaviorSubject<any>({})
  projectData = this.projectDataSource.asObservable()

  /**
   * Updates the Project Data observable via feeding the data
   * @param project 
   */
  updateProject(project: any) {
    this.projectDataSource.next(project)
  }

  /**
   * Gets the current project data
   * @returns 
   */
  getProject() {
    return new Promise((resolve) => {
      this.projectData
        .subscribe((res: any) => {
          if (JSON.stringify(res) != JSON.stringify({}) && JSON.stringify(res) != JSON.stringify(null)) {
            
            // Fetch the status
            let status = res['active']

            // Redirect accordingly
            if(status === false)
              this._Router.navigate(['/saas', 'projects', res['_id'], 'settings'])

            // Resolve the project
            resolve(res)
          }
        })
    })
  }

  /**
   * This functions checks, if the current project is active or not
   * @returns 
   */
   checkProjectIsActive() {
    return new Promise<boolean>((resolve, reject)=>{
      this.getProject()
      .then((res: any)=>{
        resolve(res['active'])
      })
      .catch(()=>{
        reject(false)
      })
    })
  }

  /**
   * Check the empty object status
   * @param object 
   * @returns 
   */
  checkEmptyObject(object: any) {
    return JSON.stringify("{}") == JSON.stringify(object)
  }
}
