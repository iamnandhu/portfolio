import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit {

  heroImage: string = 'assets/heroImage.svg'
  githubIcon: string = 'assets/githubIcon.svg'
  githubIconBlack: string = 'assets/githubIconBlack.svg'
  linkedinIcon: string = 'assets/linkedinIcon.svg'
  linkedinIconBlack: string = 'assets/linkedinIconBlack.svg'

  constructor() { }

  ngOnInit(): void {
  }

}
