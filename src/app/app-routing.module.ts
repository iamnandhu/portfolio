import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { ResumeComponent } from './resume/resume.component';

const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children: [
     {
      path: "",
      loadChildren: ()=> import('./landing-page/landing-page.module').then(m => m.LandingPageModule)
     },
     {
      path: "resume",
      component: ResumeComponent
     }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload',
    anchorScrolling: 'disabled',
    scrollPositionRestoration: 'disabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
