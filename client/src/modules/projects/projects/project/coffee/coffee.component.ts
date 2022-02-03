
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {AfterViewInit, Component, OnInit, ViewChild, Injector} from '@angular/core';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { BehaviorSubject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilityService } from 'src/modules/shared/services/utility.service';
import { ProjectsService } from 'src/modules/shared/services/projects.service';
import { CoffeeService } from 'src/modules/shared/services/coffee.service';
export interface PeriodicElement {
  BotanicalVariety: string;
  Category: string;
  PreparationMethod: string;
  CupScore: number;
}
// const ELEMENT_DATA: PeriodicElement[] = [
//   {Category: 1, BotanicalVariety: 'Arabica', PreparationMethod: 'ABX', CupScore: 80},
//   {Category: 2, BotanicalVariety: 'Jamacan', PreparationMethod: 'ahsn', CupScore: 90},
//   {Category: 3, BotanicalVariety: 'Xyz Codd', PreparationMethod: 'boiling', CupScore: 70},
//   {Category: 4, BotanicalVariety: 'Rage', PreparationMethod: 'steam', CupScore: 68},
//   {Category: 5, BotanicalVariety: 'Nestle', PreparationMethod: 'pourover', CupScore: 50},
//   {Category: 6, BotanicalVariety: 'nescage', PreparationMethod: 'jknasjnj', CupScore: 40},
//   {Category: 7, BotanicalVariety: 'Nitrogen', PreparationMethod: 14.0067, CupScore: 'N'},
//   {Category: 8, BotanicalVariety: 'Oxygen', PreparationMethod: 15.9994, CupScore: 'O'},
//   {Category: 9, BotanicalVariety: 'Fluorine', PreparationMethod: 18.9984, CupScore: 'F'},
//   {Category: 10, BotanicalVariety: 'Neon', PreparationMethod: 20.1797, CupScore: 'Ne'},
// ];
@Component({
  selector: 'app-coffee',
  templateUrl: './coffee.component.html',
  styleUrls: ['./coffee.component.scss']
})

export class CoffeeComponent implements AfterViewInit, OnInit {

  displayedColumns: string[] = ['Category', 'BotanicalVariety', 'PreparationMethod', 'CupScore'];
  dataSource = new MatTableDataSource;
  tabactive = 'list';
  projectId = this.activatedRoute.snapshot.paramMap.get('id')
  projectsService = this._Injector.get(ProjectsService)
  CoffeeService = this._Injector.get(CoffeeService)

  constructor(private _liveAnnouncer: LiveAnnouncer,private _Injector: Injector,private activatedRoute: ActivatedRoute,private _Router: Router, private coffeeService: CoffeeService) { }
  



  @ViewChild(MatSort) sort: MatSort;

  async ngOnInit() {
    // Start the Loader
    this.isLoading$.next(true)
    this.getAllCoffee()

    // Stop the Loader
    this.isLoading$.next(false)
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  isLoading$ = new BehaviorSubject(false);
  
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  viewchange(view: string){
    this.tabactive = view;
  }

  getAllCoffee(){
    return new Promise((resolve, reject)=>{
      console.log('cof service', this.projectId)
      this.coffeeService.getAllCoffee(this.projectId)
      .then((res: any)=>{
        console.log('res', res)
        this.dataSource = res['coffee']
        resolve(res['coffee'])
      })
      .catch((err)=>{
        console.error("Error - Fetch Recent Projects API :", err)
        reject([])
      })
    })
  }

}
