import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Material Module
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';

// Navbar Component
import { NavbarComponent } from './components/navbar/navbar.component';
import { MainNavbarComponent } from './components/navbar/main-navbar/main-navbar.component';
import { MainFooterComponent } from './components/navbar/main-footer/main-footer.component';
import { SideBarComponent } from './components/navbar/side-bar/side-bar.component';



@NgModule({
  declarations: [
    NavbarComponent,
    MainNavbarComponent,
    MainFooterComponent,
    SideBarComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ],
  exports: [
    NavbarComponent,
    MainNavbarComponent,
    MainFooterComponent,
    SideBarComponent,
    MaterialModule
  ]
})
export class SharedModule { }
