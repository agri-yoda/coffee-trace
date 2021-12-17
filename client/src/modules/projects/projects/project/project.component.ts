import { Component, Injector, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectsService } from 'src/modules/shared/services/projects.service';
import { UtilityService } from 'src/modules/shared/services/utility.service';
import { SubSink } from 'subsink';
import { InvitePeopleModalComponent } from '../project/people/invite-people-modal/invite-people-modal.component';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private _Injector: Injector, private _Router: Router,public dialog: MatDialog) { }

  // Project ID
  projectId = this.activatedRoute.snapshot.paramMap.get('id')

  // Projects Service
  projectsService = this._Injector.get(ProjectsService)

  // Utility Service
  utilityService = this._Injector.get(UtilityService)

  // Project
  project: any = {}

  // Selected Route
  selectedRoute = 'plantation'

  // SubSink Class
  private subSink = new SubSink()

  hide = true

  async ngOnInit() {
    
    // Fetch Project
    this.project = await this.getProject(this.projectId)

    // Set the Highlighted tab value
    this.selectedRoute = this._Router.url.split('/')[this._Router.url.split('/').length-1]

    // Send the update through observable
    this.utilityService.updateProject(this.project)
  }

  /**
   * Service function to fetch project details
   * @param projectName 
   * @returns project details
   */
  getProject(projectId: any){
    return new Promise((resolve, reject)=>{
      this.projectsService.getProject(projectId)
      .then((res: any)=>{
        console.log('project deets',res['project'])
        resolve(res['project'])
      })
      .catch((err)=>{
        console.error("Error - Fetch Project Details API :", err)
        reject([])
      })
    })
  }

  ngOnDestroy() {
    this.subSink.unsubscribe()
  }

  openDialog() {
    const dialogRef = this.dialog.open(InvitePeopleModalComponent, {
      maxHeight: '90%',
      maxWidth: '90%',
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
