import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsComponent } from './projects/projects.component';
import { ListProjectsComponent } from './projects/list-projects/list-projects.component';
import { ProjectComponent } from './projects/project/project.component';
import { CreateProjectComponent } from './projects/list-projects/create-project/create-project.component';
import { SharedModule } from '../shared/shared.module';
import { CreateProjectModalComponent } from './projects/list-projects/create-project/create-project-modal/create-project-modal.component';
import { ProjectCardComponent } from './projects/list-projects/project-card/project-card.component';
import { PlantationComponent } from './projects/project/plantation/plantation.component';
import { CoffeeComponent } from './projects/project/coffee/coffee.component';
import { DashboardComponent } from './projects/project/dashboard/dashboard.component';
import { FilesComponent } from './projects/project/files/files.component';
import { PeopleComponent } from './projects/project/people/people.component';
import { SettingsComponent } from './projects/project/settings/settings.component';


@NgModule({
  declarations: [
    ProjectsComponent,
    ListProjectsComponent,
    ProjectComponent,
    CreateProjectComponent,
    CreateProjectModalComponent,
    ProjectCardComponent,
    PlantationComponent,
    CoffeeComponent,
    DashboardComponent,
    FilesComponent,
    PeopleComponent,
    SettingsComponent
  ],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    SharedModule
  ]
})
export class ProjectsModule { }
