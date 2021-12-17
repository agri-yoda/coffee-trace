import { Component, Injector, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SubSink } from 'subsink';
import { FilesService } from '../../services/files.service';
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

  // URL
  @Input('fileName') fileName = false

  // SubSink Class
  private subSink = new SubSink()

  async ngOnInit() {
    if(this.fileName != false){
      let url = await this.getFileUrl(this.fileName)
      console.log(url)
    }
  }

  ngOnDestroy() {
    this.subSink.unsubscribe()
  }

  /**
   * This function fetches the signed URL from S3 Bucket
   * @param file 
   * @returns 
   */
   getFileUrl(fileName: any) {
    return new Promise((resolve, reject) => {
      let filesService = this._Injector.get(FilesService)
      filesService.getFileURL(fileName)
        .then((res: any) => resolve(res['url']))
        .catch(() => reject(null))
    })
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
