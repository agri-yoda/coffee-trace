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
import { MatSortModule } from "@angular/material/sort";

import { NgxCsvParserModule } from 'ngx-csv-parser';
import { InvitePeopleModalComponent } from './projects/project/people/invite-people-modal/invite-people-modal.component';
import { TableSortingExampleComponent } from './projects/project/table-sorting-example/table-sorting-example.component';
import { PlantationCardsComponent } from './projects/project/plantation/plantation-cards/plantation-cards.component';

// Maps Module
import { MapsModule } from '../maps/maps.module';

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
    SettingsComponent,
    InvitePeopleModalComponent,
    TableSortingExampleComponent,
    PlantationCardsComponent
  ],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    SharedModule,
    NgxCsvParserModule,
    MatSortModule,
    MapsModule
    // AgmCoreModule.forRoot({
    //   // please get your own API key here:
    //   // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en
    //   apiKey: 'AIzaSyBDg13IWUNvq6F28pTlhWnEw7n9a1u-4K0'
    // })
  ]
})
export class ProjectsModule { }
