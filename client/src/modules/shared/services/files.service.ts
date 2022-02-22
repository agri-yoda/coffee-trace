import { HttpClient, HttpBackend } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  private httpWithoutInterceptor: HttpClient

  constructor(private _HTTP: HttpClient, private _HTTP_BACKEND: HttpBackend) { 
    this.httpWithoutInterceptor = new HttpClient(this._HTTP_BACKEND)
  }

  BASE_API_URL = environment.BASE_API_URL + '/files'

  /**
   * This function is responsible for fetching Upload URL
   * @param fileName 
   * @returns 
   */
  getUploadURL(fileName: any, projectId: string) {
    return this._HTTP.post(this.BASE_API_URL + '/signed-url', {
      file_name: fileName,
      project:  projectId
    }).toPromise()
  }

  /**
   * This function is responsible for uploading file usin signed URL
   * @param url 
   * @param file 
   * @returns 
   */
  uploadUsingSignedURL(url: any, file: File, projectId: string) {
    let form = new FormData()
    form.append("file_name", file)
    form.append("project", projectId)
    return this.httpWithoutInterceptor.put(url, form)
    .toPromise()
  }

  /**
   * This function is responsible to fetch all the objects in a folder
   * @param folder_name 
   * @returns 
   */
  getFilesByFolders(folder_name: any){
    return this._HTTP.post(this.BASE_API_URL + `/${folder_name}`, {
      folder_name: folder_name
    }).toPromise()
  }
}
