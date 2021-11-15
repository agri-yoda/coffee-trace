import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProjectsService } from 'src/modules/shared/services/projects.service';
import { SubSink } from 'subsink';
import { CreateProjectModalComponent } from './create-project-modal/create-project-modal.component';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss']
})
export class CreateProjectComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private _Injector: Injector
  ) { }

  // Projects Service
  projectsService = this._Injector.get(ProjectsService)

  // SubSink Class
  private subSink = new SubSink()

  // Project Event Emitter
  @Output('project') projectEmitter = new EventEmitter()

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.subSink.unsubscribe()
  }

  openDialog() {
    const dialogRef = this.dialog.open(CreateProjectModalComponent, {
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
        if (result != null) {
          let project = await this.createProject(result)
          if (!this.checkEmptyObject(project))
            this.projectEmitter.emit(project)
        }
      }))
  }

  /**
   * Service function to create new project
   * @param projectName 
   * @returns new project
   */
  createProject(projectName: any) {
    return new Promise((resolve, reject) => {
      this.projectsService.createProject(projectName)
        .then((res: any) => {
          resolve(res['project'])
        })
        .catch((err) => {
          console.error("Error - Create Project API :", err)
          reject({})
        })
    })
  }

  /**
   * Check the empty object status
   * @param object 
   * @returns 
   */
  checkEmptyObject(object: any) {
    return JSON.stringify("{}") == JSON.stringify(object)
  }

}
