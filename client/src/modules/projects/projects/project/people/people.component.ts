import { Component, Injector, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { UtilityService } from 'src/modules/shared/services/utility.service';
import { SubSink } from 'subsink';
import { InvitePeopleModalComponent } from './invite-people-modal/invite-people-modal.component';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit {

  constructor(public dialog: MatDialog, private _Injector: Injector) { }

  // Project Details
  project: any = {}

  // Utility Service
  utilityService = this._Injector.get(UtilityService)

  // Is loading Behaviour
  isLoading$ = new BehaviorSubject(false)

  // SubSink Class
  private subSink = new SubSink()

  async ngOnInit() {

    // Start the Loader
    this.isLoading$.next(true)

    // Fetch the Project
    this.project = await this.utilityService.getProject()

    // Stop the Loader
    this.isLoading$.next(false)
  }

  ngOnDestroy() {
    this.subSink.unsubscribe()
  }

  openDialog() {
    const dialogRef = this.dialog.open(InvitePeopleModalComponent, {
      height: '90%',
      width: '90%',
      autoFocus: true,
      hasBackdrop: true,
      disableClose: false,
      closeOnNavigation: true
    })

    // Dialog Reference 
    this.subSink.add(dialogRef
      .afterClosed()
      .subscribe(async (result) => {
        console.log(result)
      }))
  }

}
