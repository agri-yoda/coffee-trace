import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoffeeHomeComponent } from './coffee-home/coffee-home.component';

const routes: Routes = [
  {
    path: '', component: CoffeeHomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoffeeRoutingModule { }
