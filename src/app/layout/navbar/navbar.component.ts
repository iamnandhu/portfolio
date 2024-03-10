import { Component, OnInit, ViewChild } from '@angular/core';
import { trigger, style, transition, animate, state, animateChild, group, query } from '@angular/animations';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  animations: [
    trigger('openClose', [
      state('open', style({
        width: '250px'
      })),
      state('closed', style({
        width: '0px'
      })),
      transition('open => closed', [
        group([
          query('@fadeInOut', animateChild()),
          animate('0.5s ease-in-out', style({ width: '0px' }))
        ])
      ]),
      transition('closed => open', [
        style({ width: '0px' }),
        group([
          animate('0.5s ease-in-out', style({ width: '250px' })),
          query('@fadeInOut', animateChild())
        ])
      ])
    ]),
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(100%)' }),
        animate('0.3s ease-out', style({ opacity: 1, transform: 'translateX(0)' })),
      ]),
      transition(':leave', [
        animate('0.3s ease-out', style({ opacity: 0, transform: 'translateX(100%)' })),
      ])
    ])
  ]
})
export class NavbarComponent implements OnInit {
  @ViewChild('mobileDrawer') mobileDrawer: any;
  @ViewChild('menuIcon') menuIcon: any;
  flagMobileMenuDrawerVisible: boolean = false;
  clickedMenu: string = ""

  constructor() { 
  }

  ngOnInit(): void {
  }

  toggleNavbar(): void {
    this.flagMobileMenuDrawerVisible = !this.flagMobileMenuDrawerVisible
  }

}
