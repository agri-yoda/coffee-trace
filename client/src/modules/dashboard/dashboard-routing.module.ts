import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainNavbarComponent } from '../shared/components/navbar/main-navbar/main-navbar.component';

const routes: Routes = [
  { path: '', component: MainNavbarComponent, children: [] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
