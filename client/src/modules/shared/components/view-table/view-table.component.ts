import { Component, Injector, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SubSink } from 'subsink';
import { CustomTableComponent } from '../custom-table/custom-table.component';

@Component({
  selector: 'app-view-table',
  templateUrl: './view-table.component.html',
  styleUrls: ['./view-table.component.scss']
})
export class ViewTableComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private _Injector: Injector
  ) { }

  // Dataset
  @Input('data') data = []

  // Columns
  @Input('columns') colHeaders = []

  // SubSink Class
  private subSink = new SubSink()

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.subSink.unsubscribe()
  }

  openDialog() {
    const dialogRef = this.dialog.open(CustomTableComponent, {
      maxWidth: '100%',
      maxHeight: '100%',
      width: '90%',
      height: '90%',
      autoFocus: true,
      hasBackdrop: true,
      disableClose: true,
      closeOnNavigation: true,
      data: {
        data: this.data || [],
        columns: this.colHeaders || []
      }
    })

    // Dialog Reference 
    // this.subSink.add(dialogRef
    //   .afterClosed()
    //   .subscribe((result) => {}))
  }


}
