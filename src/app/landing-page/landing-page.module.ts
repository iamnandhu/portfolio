import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { HeroComponent } from './landing-page/hero/hero.component';
import { SkillsComponent } from './landing-page/skills/skills.component';
import { ExperienceComponent } from './landing-page/experience/experience.component';
import { ProjectsComponent } from './landing-page/projects/projects.component';
import { ContactComponent } from './landing-page/contact/contact.component';
import { LandingPageRoutingModule } from './landing-page-routing.module';

@NgModule({
  declarations: [
    LandingPageComponent,
    HeroComponent,
    SkillsComponent,
    ExperienceComponent,
    ProjectsComponent,
    ContactComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    LandingPageRoutingModule
  ]
})
export class LandingPageModule { }
