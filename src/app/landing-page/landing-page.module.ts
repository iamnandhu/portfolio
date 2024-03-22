import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingPageRoutingModule } from './landing-page-routing.module';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { HeroComponent } from './landing-page/hero/hero.component';
import { SkillsComponent } from './landing-page/skills/skills.component';


@NgModule({
  declarations: [
    LandingPageComponent,
    HeroComponent,
    SkillsComponent
  ],
  imports: [
    CommonModule,
    LandingPageRoutingModule,
  ]
})
export class LandingPageModule { }
