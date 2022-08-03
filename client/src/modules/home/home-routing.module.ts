import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeHeaderComponent } from './home-header/home-header.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [
  {
    path: '', component: HomeHeaderComponent, children: [
      { path: 'about', component: LandingPageComponent },
      { path: 'sign-up', component: SignUpComponent },
      { path: 'login', component: SignInComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
