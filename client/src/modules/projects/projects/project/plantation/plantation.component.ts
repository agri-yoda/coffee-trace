import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UtilityService } from 'src/modules/shared/services/utility.service';
import { NgxCsvParser } from 'ngx-csv-parser';
import { NgxCSVParserError } from 'ngx-csv-parser';
import { FilesService } from 'src/modules/shared/services/files.service';
import { ProjectsService } from 'src/modules/shared/services/projects.service';

@Component({
  selector: 'app-plantation',
  templateUrl: './plantation.component.html',
  styleUrls: ['./plantation.component.scss']
})
export class PlantationComponent implements OnInit {

  constructor(private _Injector: Injector, private ngxCsvParser: NgxCsvParser) { }

  dataset: any[] = [
    { id: 1, name: 'Ted Right', address: 'Wall Street' },
    { id: 2, name: 'Frank Honest', address: 'Pennsylvania Avenue' },
    { id: 3, name: 'Joan Well', address: 'Broadway' },
    { id: 4, name: 'Gail Polite', address: 'Bourbon Street' },
    { id: 5, name: 'Michael Fair', address: 'Lombard Street' },
    { id: 6, name: 'Mia Fair', address: 'Rodeo Drive' },
    { id: 7, name: 'Cora Fair', address: 'Sunset Boulevard' },
    { id: 8, name: 'Jack Right', address: 'Michigan Avenue' },
  ];

  // Project Details
  project: any = {}

  // Utility Service
  public utilityService = this._Injector.get(UtilityService)

  // Is loading Behaviour
  isLoading$ = new BehaviorSubject(false);

  // Is File Present
  isFilePresent$ = new BehaviorSubject(false);

  data: any = []
  columns: any = []
  header = false

  @ViewChild('fileImportInput', { static: false }) fileImportInput: any;

  async ngOnInit() {

    // Start the Loader
    this.isLoading$.next(true)

    // Fetch the Project
    this.project = await this.utilityService.getProject()

    // Check if csv exist or not
    if(this.project.plantation.csv != 'default_csv'){
      this.isFilePresent$.next(true)
    }

    // Stop the Loader
    this.isLoading$.next(false)
  }

  ngOnDestroy() {
    this.isFilePresent$.next(false)
  }

  // Your applications input change listener for the CSV File
  async fileChangeListener($event: any) {

    // Select the files from the event
    const files = $event.srcElement.files

    // Upload the file to the bucket
    let fileUploaded = await this.uploadFile(files[0])

    if (fileUploaded == true) {

      // Update the project
      let project = await this.updatePlantationCSV(`${JSON.parse(sessionStorage.getItem('user') + "")['_id']}/${files[0].name}`)

      // Send the update 
      this.utilityService.updateProject(project)

      // Parse the file you want to select for the operation along with the configuration
      this.ngxCsvParser.parse(files[0], { header: this.header, delimiter: ',' })
        .pipe().subscribe((result: any) => {
          this.columns = result[0]
          this.data = result.slice(1)
          this.isFilePresent$.next(true)
        }, (error: NgxCSVParserError) => {
          console.log('Error', error)
        })
    } else {
      console.log('Unable to upload the file!')
    }

  }

  /**
   * This function fetches the signed URL from S3 Bucket
   * @param file 
   * @returns 
   */
  getSignedUrl(file: File) {
    return new Promise((resolve, reject) => {
      let filesService = this._Injector.get(FilesService)
      filesService.getUploadURL(file.name)
        .then((res: any) => resolve(res['url']))
        .catch(() => reject(null))
    })
  }

  /**
   * This function uploads the file to the bucket
   * @param file 
   * @returns 
   */
  uploadFile(file: any) {
    return new Promise(async (resolve, reject) => {
      let filesService = this._Injector.get(FilesService)
      let url = await this.getSignedUrl(file)
      filesService.uploadUsingSignedURL(url, file)
        .then(() => resolve(true))
        .catch(() => reject(false))
    })
  }

  async updatePlantationCSV(csv: any) {
    let projectData = {
      plantation: {
        description: this.project.plantation.description,
        area: this.project.plantation.area,
        altitude: this.project.plantation.altitude,
        rainfall: this.project.plantation.rainfall,
        description_video: this.project.plantation.description_video,
        region_and_bio: this.project.plantation.region_and_bio,
        csv: csv
      }
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
  callUpdateServiceFunction(projectData: any) {
    return new Promise((resolve) => {
      let projectService = this._Injector.get(ProjectsService)
      projectService
        .updateProject(this.project._id, projectData)
        .then((res: any) => {
          resolve(res['project'])
        })
        .catch(() => {
          resolve(this.project)
        })
    })
  }


  // J+PGxpYm0yD3FRO1ICI0qkkGYeK988ekHmLHGL4m
  // AKIAZGEM2CPVE6VJH3DY
}
