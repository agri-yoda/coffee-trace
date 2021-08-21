import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Page Not Found Component
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

// Http Client Module
import { HttpClientModule} from '@angular/common/http';

// NGX UI Loader Module
import { NgxUiLoaderModule, NgxUiLoaderHttpModule } from "ngx-ui-loader";

// Location Strategy
import { PathLocationStrategy, LocationStrategy } from '@angular/common';
import { MaterialModule } from 'src/modules/material/material.module';


// Configs
import config from 'src/configs/ngx-ui-config';


@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  imports: [

    // Browser Module
    BrowserModule,

    // App Routing Module
    AppRoutingModule,

    // Browser Animations Module
    BrowserAnimationsModule,

    // Http Client Module
    HttpClientModule,

    // Material Module
    MaterialModule,

    // NGX UI Module
    NgxUiLoaderModule.forRoot(config),

    // NGX UI HTTP Module
    NgxUiLoaderHttpModule.forRoot({ showForeground: true })
  ],
  providers: [

    // Path Location Strategy
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
