import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/modules/shared/guards/auth.guard';
import { MainNavbarComponent } from '../shared/components/navbar/main-navbar/main-navbar.component';

const routes: Routes = [
  {
    path: '', component: MainNavbarComponent, canActivate: [AuthGuard], children: [

      // 'dashboard' ROUTE
      {
        path: 'dashboard',
        loadChildren: () => import('src/modules/dashboard/dashboard.module')
          .then((module) => module.DashboardModule)
      },

      // 'projects' ROUTE
      {
        path: 'projects',
        loadChildren: () => import('src/modules/projects/projects.module')
          .then((module) => module.ProjectsModule)
      },

      // 'settings' ROUTE
      {
        path: 'settings',
        loadChildren: () => import('src/modules/settings/settings.module')
          .then((module) => module.SettingsModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SaasRoutingModule { }
