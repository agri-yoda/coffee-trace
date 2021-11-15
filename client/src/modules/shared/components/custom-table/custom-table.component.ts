import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SubSink } from 'subsink';
import { addClassesToRows } from './utils/hooks-callback';

@Component({
  selector: 'app-custom-table',
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.scss']
})
export class CustomTableComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any,
    public dialogRef: MatDialogRef<CustomTableComponent>,
  ) { }

  // Dataset
  @Input('data') data = this.dialogData.data

  // Columns
  @Input('columns') colHeaders = this.dialogData.columns

  // CSS Classes
  addClassesToRows = addClassesToRows

  // Hidden Columns Indicator
  hiddenColumns = { indicators: true }

  // License Keys
  licenseKey = 'non-commercial-and-evaluation'

  // SubSink Class
  private subSink = new SubSink()

  ngOnDestroy() {
    this.subSink.unsubscribe()
  }

  ngOnInit() {
    console.log(this.colHeaders)
    this.subSink.add(this.dialogRef.keydownEvents().subscribe(event => {
      if (event.key === "Escape") {
        this.onClose()
      }
    }))
  }

  // Close the Dialog
  onClose() {
    this.dialogRef.close()
  }

}
