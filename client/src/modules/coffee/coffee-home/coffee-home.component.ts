import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject } from 'rxjs';
import { UtilityService } from 'src/modules/shared/services/utility.service';

@Component({
  selector: 'app-coffee-home',
  templateUrl: './coffee-home.component.html',
  styleUrls: ['./coffee-home.component.scss']
})
export class CoffeeHomeComponent implements OnInit {

  constructor(
    private _Injector: Injector
  ) { }

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
    'bean_sizes',
    'botanical_variety',
    'category',
    'preparation_method',
    'grade',
    'cup_score'
  ]

  // Project Details
  project: any = {}

  // Coffee Data
  data: any = []

  ngOnInit(): void {
  }

}
