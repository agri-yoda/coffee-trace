import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListProjectsComponent } from './projects/list-projects/list-projects.component';
import { CoffeeComponent } from './projects/project/coffee/coffee.component';
import { DashboardComponent } from './projects/project/dashboard/dashboard.component';
import { FilesComponent } from './projects/project/files/files.component';
import { PeopleComponent } from './projects/project/people/people.component';
import { PlantationComponent } from './projects/project/plantation/plantation.component';
import { ProjectComponent } from './projects/project/project.component';
import { SettingsComponent } from './projects/project/settings/settings.component';
import { ProjectsComponent } from './projects/projects.component';
import { TableSortingExampleComponent } from './projects/project/table-sorting-example/table-sorting-example.component';

const routes: Routes = [
  {
    path: '', component: ProjectsComponent, children: [
      {
        path: 'all', component: ListProjectsComponent
      },
      {
        path: ':id', component: ProjectComponent, children: [
          { path: 'plantation', component: PlantationComponent },
          // { path: 'coffee', component: CoffeeComponent },
          { path: 'dashboard', component: DashboardComponent },
          { path: 'files', component: FilesComponent },
          { path: 'people', component: PeopleComponent },
          { path: 'settings', component: SettingsComponent },
          { path: 'tablesort', component: TableSortingExampleComponent }
        ]
      },
      {
        path: ':id/coffee', component: CoffeeComponent
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule { }
