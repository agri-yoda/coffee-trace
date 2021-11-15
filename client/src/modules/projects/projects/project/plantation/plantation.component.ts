import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UtilityService } from 'src/modules/shared/services/utility.service';
import { NgxCsvParser } from 'ngx-csv-parser';
import { NgxCSVParserError } from 'ngx-csv-parser';

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

  data: any  = []
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
  fileChangeListener($event: any): void {

    // Select the files from the event
    const files = $event.srcElement.files;

    // Parse the file you want to select for the operation along with the configuration
    this.ngxCsvParser.parse(files[0], { header: this.header, delimiter: ',' })
      .pipe().subscribe((result: any) => {
        this.columns = result[0]
        this.data = result.slice(1)
        this.isFilePresent$.next(true)
      }, (error: NgxCSVParserError) => {
        console.log('Error', error)
      })

  }


  // J+PGxpYm0yD3FRO1ICI0qkkGYeK988ekHmLHGL4m
  // AKIAZGEM2CPVE6VJH3DY
}
