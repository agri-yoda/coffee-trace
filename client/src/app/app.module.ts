import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Page Not Found Component
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

// Http Client Module
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

// NGX UI Loader Module
import { NgxUiLoaderModule, NgxUiLoaderHttpModule } from "ngx-ui-loader";

// Location Strategy
import { PathLocationStrategy, LocationStrategy } from '@angular/common';
import { MaterialModule } from 'src/modules/material/material.module';
import { MatSortModule } from "@angular/material/sort";
import { AgmCoreModule } from '@agm/core';

// Configs
import config from 'src/configs/ngx-ui-config';

// Interceptors
import { AuthInterceptor } from 'src/modules/shared/interceptors/auth.interceptor';


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
    MatSortModule,

    // Browser Animations Module
    BrowserAnimationsModule,

    // Http Client Module
    HttpClientModule,

    // Material Module
    MaterialModule,

    AgmCoreModule.forRoot({
      // please get your own API key here:
      // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en
      apiKey: 'AIzaSyBDg13IWUNvq6F28pTlhWnEw7n9a1u-4K0'
    }),

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

    // Interceptors
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
