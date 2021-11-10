import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }

  // Project Data Behaviour Subject
  public projectDataSource = new BehaviorSubject<any>({})
  projectData = this.projectDataSource.asObservable()

  /**
   * Updates the Project Data observable via feeding the data
   * @param project 
   */
  updateProject(project: any){
    this.projectDataSource.next(project)
  }

  /**
   * Gets the current project data
   * @returns 
   */
  getProject(){
    return new Promise((resolve)=>{
      this.projectData
      .subscribe((res: any) => {
        if(JSON.stringify(res) != JSON.stringify({}) && JSON.stringify(res) != JSON.stringify(null)){
          resolve(res)
        }
      })
    })
  }
}
