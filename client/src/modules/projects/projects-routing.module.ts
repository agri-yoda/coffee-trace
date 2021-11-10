import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListProjectsComponent } from './projects/list-projects/list-projects.component';
import { CoffeeComponent } from './projects/project/coffee/coffee.component';
import { DashboardComponent } from './projects/project/dashboard/dashboard.component';
import { FilesComponent } from './projects/project/files/files.component';
import { PlantationComponent } from './projects/project/plantation/plantation.component';
import { ProjectComponent } from './projects/project/project.component';
import { ProjectsComponent } from './projects/projects.component';

const routes: Routes = [
  {
    path: '', component: ProjectsComponent, children: [
      {
        path: 'all', component: ListProjectsComponent
      },
      {
        path: ':id', component: ProjectComponent, children: [
          { path: 'plantation', component: PlantationComponent },
          { path: 'coffee', component: CoffeeComponent },
          { path: 'dashboard', component: DashboardComponent },
          { path: 'files', component: FilesComponent }
        ]
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule { }
