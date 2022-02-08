
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { SubSink } from 'subsink';
import { UtilityService } from 'src/modules/shared/services/utility.service';
import { ProjectsService } from 'src/modules/shared/services/projects.service';
import { CoffeeService } from 'src/modules/shared/services/coffee.service';

@Component({
  selector: 'app-coffee',
  templateUrl: './coffee.component.html',
  styleUrls: ['./coffee.component.scss']
})

export class CoffeeComponent implements AfterViewInit, OnInit {

  tabactive = 'list';
  projectId = this.activatedRoute.snapshot.paramMap.get('id')
  projectsService = this._Injector.get(ProjectsService)
  CoffeeService = this._Injector.get(CoffeeService)

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private _Injector: Injector,
    private activatedRoute: ActivatedRoute,
    private _Router: Router,
    public dialog: MatDialog,
    private coffeeService: CoffeeService) { }

  // Utility Service
  public utilityService = this._Injector.get(UtilityService)

  // Datasource
  dataSource = new MatTableDataSource([])

  // Sort Table
  @ViewChild(MatSort, { static: true }) sort: MatSort

  // Paginator
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator

  // Is loading behaviour
  isLoading$ = new BehaviorSubject(false)

  // Columns list
  @Input('columns') displayedColumns: string[] = [
    'active',
    'attributes'
  ]

  // Project Details
  project: any = {}

  // Coffee Data
  data: any = []

  async ngOnInit() {

    // Start the Loader
    this.isLoading$.next(true)

    // Fetch the Project
    this.project = await this.utilityService.getProject()

    // Fill up the coffee data
    this.data = await this.getRecentCoffee(this.project._id)

    // Populate datasource
    this.populateDatasource(this.data)

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

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  viewchange(view: string) {
    this.tabactive = view;
  }

  getRecentCoffee(projectId: any) {
    return new Promise((resolve, reject) => {
      this.coffeeService.getRecentCoffee(projectId)
        .then((res: any) => {
          resolve(res['coffee'])
        })
        .catch((err) => {
          console.error("Error - Fetch Recent Projects API :", err)
          reject([])
        })
    })
  }

  populateDatasource(dataSet: any) {
    this.dataSource = new MatTableDataSource(dataSet)
    this.dataSource.sort = this.sort
    this.dataSource.paginator = this.paginator
  }

}
