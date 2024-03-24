import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingPageRoutingModule } from './landing-page-routing.module';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { HeroComponent } from './landing-page/hero/hero.component';
import { SkillsComponent } from './landing-page/skills/skills.component';
import { ExperienceComponent } from './landing-page/experience/experience.component';


@NgModule({
  declarations: [
    LandingPageComponent,
    HeroComponent,
    SkillsComponent,
    ExperienceComponent
  ],
  imports: [
    CommonModule,
    LandingPageRoutingModule,
  ]
})
export class LandingPageModule { }
