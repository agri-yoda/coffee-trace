import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UtilityService } from 'src/modules/shared/services/utility.service';
import { NgxCsvParser } from 'ngx-csv-parser';
import { NgxCSVParserError } from 'ngx-csv-parser';
import { FilesService } from 'src/modules/shared/services/files.service';
import { ProjectsService } from 'src/modules/shared/services/projects.service';
// import { MouseEvent } from '@agm/core';

@Component({
  selector: 'app-plantation',
  templateUrl: './plantation.component.html',
  styleUrls: ['./plantation.component.scss']
})
export class PlantationComponent implements OnInit {

  zoom: number = 8;
  
  // initial center position for the map
  lat: number = 51.673858;
  lng: number = 7.815982;

  // clickedMarker(label: string, index: number) {
  //   console.log(`clicked the marker: ${label || index}`)
  // }
  
  // mapClicked($event: MouseEvent) {
  //   this.markers.push({
  //     lat: $event.coords.lat,
  //     lng: $event.coords.lng,
  //     draggable: true
  //   });
  // }
  
  // markerDragEnd(m: marker, $event: MouseEvent) {
  //   console.log('dragEnd', m, $event);
  // }
  
  markers: marker[] = [
	  {
		  lat: 51.373858,
		  lng: 7.215982,
		  label: 'B',
		  draggable: false
	  },
	  {
		  lat: 51.723858,
		  lng: 7.895982,
		  label: 'C',
		  draggable: true
	  }
  ]

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
    let fileUploaded = await this.uploadFile(files[0], this.project._id)

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
  getSignedUrl(file: File, projectId: string) {
    return new Promise((resolve, reject) => {
      let filesService = this._Injector.get(FilesService)
      filesService.getUploadURL(file.name, projectId)
        .then((res: any) => resolve(res['url']))
        .catch(() => reject(null))
    })
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

  updatePlantationCSV(csv: any){
    return new Promise((resolve, reject)=>{
      let projectData = {
        'plantation.csv': csv
      }
      let projectService = this._Injector.get(ProjectsService)
      projectService.updateProject(this.project._id, projectData)
      .then((res: any)=>{
        resolve(res['project'])
      })
      .catch(()=>{
        reject(this.project)
      })
    })
  }


  // J+PGxpYm0yD3FRO1ICI0qkkGYeK988ekHmLHGL4m
  // AKIAZGEM2CPVE6VJH3DY
}

interface marker {
	lat: number;
	lng: number;
	label?: string;
	draggable: boolean;
}
