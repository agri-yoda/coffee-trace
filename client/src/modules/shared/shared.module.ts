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

// Pipes
import { SafePipe } from './pipes/safe.pipe';

// Hot Table Module
import { HotTableModule } from '@handsontable/angular';

// Custom Table Component
import { CustomTableComponent } from './components/custom-table/custom-table.component';
import { ViewTableComponent } from './components/view-table/view-table.component';

@NgModule({
  declarations: [
    NavbarComponent,
    MainNavbarComponent,
    MainFooterComponent,
    SideBarComponent,
    SafePipe,
    CustomTableComponent,
    ViewTableComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    HotTableModule
  ],
  exports: [
    NavbarComponent,
    MainNavbarComponent,
    MainFooterComponent,
    SideBarComponent,
    MaterialModule,
    SafePipe,
    ViewTableComponent
  ]
})
export class SharedModule { }
