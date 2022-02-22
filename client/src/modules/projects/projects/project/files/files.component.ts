import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject } from 'rxjs';
import { FilesService } from 'src/modules/shared/services/files.service';
import { UtilityService } from 'src/modules/shared/services/utility.service';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss']
})
export class FilesComponent implements OnInit {

  constructor(private _Injector: Injector) { }

  // Datasource
  dataSource = new MatTableDataSource([])

  // Sort Table
  @ViewChild(MatSort, { static: true }) sort: MatSort

  // Paginator
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator

  // Columns list
  @Input('columns') displayedColumns: string[] = [
    'Key',
    'LastModified',
    'Size'
  ]

  // Files Data
  data: any = []

  // Project Details
  project: any = {}

  // Utility Service
  utilityService = this._Injector.get(UtilityService)

  // Is loading Behaviour
  isLoading$ = new BehaviorSubject(false);

  async ngOnInit() {
    
    // Start the Loader
    this.isLoading$.next(true)

    // Fetch the Project
    this.project = await this.utilityService.getProject()

    // Fill up the coffee data
    this.data = await this.getProjectFiles(this.project._id)

    // Populate datasource
    this.populateDatasource(this.data)

    // Stop the Loader
    this.isLoading$.next(false)
  }

  /**
   * This function fetches all the files in a project
   * @param file 
   * @returns 
   */
   getProjectFiles(projectId: string) {
    return new Promise((resolve, reject) => {
      let filesService = this._Injector.get(FilesService)
      filesService.getFilesByFolders(projectId)
        .then((res: any) => resolve(res['data']))
        .catch(() => reject([]))
    })
  }

  populateDatasource(dataSet: any) {
    this.dataSource = new MatTableDataSource(dataSet)
    this.dataSource.sort = this.sort
    this.dataSource.paginator = this.paginator
  }

  // Your applications input change listener for the File
  async fileChangeListener($event: any) {

    // Select the files from the event
    const files = $event.srcElement.files

    // Upload the file to the bucket
    let fileUploaded = await this.uploadFile(files[0], this.project._id)

    if (fileUploaded == true) {
      console.log('File has been uploaded successfully!')

    } else {
      console.log('Unable to upload the file!')
    }
  }

  /**
   * This function uploads the file to the bucket
   * @param file 
   * @returns 
   */
   uploadFile(file: any, projectId: string) {
    return new Promise(async (resolve, reject) => {
      let filesService = this._Injector.get(FilesService)
      let url = await this.getSignedUrl(file, projectId)
      filesService.uploadUsingSignedURL(url, file, projectId)
        .then(() => resolve(true))
        .catch(() => reject(false))
    })
  }

  /**
   * This function fetches the signed URL from S3 Bucket
   * @param file 
   * @returns 
   */
   getSignedUrl(file: File, projectId: string) {
    return new Promise((resolve, reject) => {
      let filesService = this._Injector.get(FilesService)
      filesService.getUploadURL(file.name, projectId)
        .then((res: any) => resolve(res['url']))
        .catch(() => reject(null))
    })
  }

}
