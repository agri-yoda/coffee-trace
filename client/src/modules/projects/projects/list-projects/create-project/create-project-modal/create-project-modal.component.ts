import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-create-project-modal',
  templateUrl: './create-project-modal.component.html',
  styleUrls: ['./create-project-modal.component.scss']
})
export class CreateProjectModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CreateProjectModalComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  // Project Name Variable
  projectName: any

  ngOnInit(): void {
  }

  createNewProject(projectName: any) {
    this.dialogRef.close(projectName)
    this.projectName = ""
  }

}
