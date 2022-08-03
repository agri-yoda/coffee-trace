import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoffeeRoutingModule } from './coffee-routing.module';
import { CoffeeHomeComponent } from './coffee-home/coffee-home.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    CoffeeHomeComponent
  ],
  imports: [
    CommonModule,
    CoffeeRoutingModule,
    SharedModule
  ]
})
export class CoffeeModule { }
