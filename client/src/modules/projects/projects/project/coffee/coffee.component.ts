
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {AfterViewInit, Component, OnInit, ViewChild, Injector} from '@angular/core';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { BehaviorSubject } from 'rxjs';
import { UtilityService } from 'src/modules/shared/services/utility.service';
export interface PeriodicElement {
  BotanicalVariety: string;
  Category: number;
  PreparationMethod: number;
  CupScore: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {Category: 1, BotanicalVariety: 'Hydrogen', PreparationMethod: 1.0079, CupScore: 'H'},
  {Category: 2, BotanicalVariety: 'Helium', PreparationMethod: 4.0026, CupScore: 'He'},
  {Category: 3, BotanicalVariety: 'Lithium', PreparationMethod: 6.941, CupScore: 'Li'},
  {Category: 4, BotanicalVariety: 'Beryllium', PreparationMethod: 9.0122, CupScore: 'Be'},
  {Category: 5, BotanicalVariety: 'Boron', PreparationMethod: 10.811, CupScore: 'B'},
  {Category: 6, BotanicalVariety: 'Carbon', PreparationMethod: 12.0107, CupScore: 'C'},
  {Category: 7, BotanicalVariety: 'Nitrogen', PreparationMethod: 14.0067, CupScore: 'N'},
  {Category: 8, BotanicalVariety: 'Oxygen', PreparationMethod: 15.9994, CupScore: 'O'},
  {Category: 9, BotanicalVariety: 'Fluorine', PreparationMethod: 18.9984, CupScore: 'F'},
  {Category: 10, BotanicalVariety: 'Neon', PreparationMethod: 20.1797, CupScore: 'Ne'},
];
@Component({
  selector: 'app-coffee',
  templateUrl: './coffee.component.html',
  styleUrls: ['./coffee.component.scss']
})

export class CoffeeComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['Category', 'BotanicalVariety', 'PreparationMethod', 'CupScore'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  constructor(private _liveAnnouncer: LiveAnnouncer,private _Injector: Injector) { }
  
  @ViewChild(MatSort) sort: MatSort;


  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // Project Details
  // project: any = {}
  // Utility Service
  // utilityService = this._Injector.get(UtilityService)
  // // Is loading Behaviour
  isLoading$ = new BehaviorSubject(false);

  async ngOnInit() {
    // Start the Loader
    this.isLoading$.next(true)

    // Fetch the Project
    // this.project = await this.utilityService.getProject()

    // Stop the Loader
    this.isLoading$.next(false)
  }
  
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

}
