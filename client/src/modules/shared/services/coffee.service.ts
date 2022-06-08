import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class CoffeeService {

  constructor(private _HTTP: HttpClient) { }

  BASE_API_URL = environment.BASE_API_URL + '/coffees'

  /**
   * This function is responsible for creating a new project
   * @param coffeeData 
   * @returns 
   */
  createCoffee(coffeeData: any) {
    return this._HTTP.post(this.BASE_API_URL + '/', {
      coffee: coffeeData
    }).toPromise()
  }

  /**
   * This function is responsible for fetching the first recent projects
   * @returns first 20 projects
   */
  getFirstRecentProjects() {
    return this._HTTP.get(this.BASE_API_URL + '/')
      .toPromise()
  }

  /**
   * This function is responsible for fetching recent coffee
   * @returns recent 20 coffees
   */
   getRecentCoffee(projectId: any) {
    return this._HTTP.get(this.BASE_API_URL + `/recent?projectId=${projectId}`)
      .toPromise()
  }

  /**
   * This function is responsible for fetching the first recent projects
   * @returns first 20 projects
   */
  getNextRecentProjects(lastProjectId: any) {
    return this._HTTP.get(this.BASE_API_URL + `/next/${lastProjectId}`)
      .toPromise()
  }

  /**
   * This function is responsible for fetching the project details
   * @returns project details
   */
  getProject(projectId: any) {
    return this._HTTP.get(this.BASE_API_URL + `/${projectId}`)
      .toPromise()
  }

  /**
   * This function is responsible for updating the project details
   * @returns updates the project
   */
  updateProject(projectId: any, projectData: any) {
    return this._HTTP.put(this.BASE_API_URL + `/${projectId}`, { project: projectData })
      .toPromise()
  }

  /**
   * This function is responsible for removing the project
   * @returns project details
   */
   removeProject(projectId: any) {
    return this._HTTP.delete(this.BASE_API_URL + `/${projectId}`)
      .toPromise()
  }
}
