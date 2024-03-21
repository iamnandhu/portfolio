import { Component, HostListener, OnInit, Renderer2 } from '@angular/core';
import { trigger, style, transition, group, animate, state, animateChild, query } from '@angular/animations';

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
        style({ width: '250px' }),
        group([
          animate('1s ease-out', style({ width: '0px' })),
          query('@fadeInOut', animateChild()),
        ])
      ]),
      transition('closed => open', [
        style({ width: '0px' }),
        group([
          animate('1s ease-in', style({ width: '250px' })),
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
  flagMobileMenuDrawerVisible: boolean = false;
  clickedMenu: string = ""
  private clickInside: boolean = false;

  constructor(private _renderer: Renderer2) {}

  ngOnInit(): void {}

  @HostListener('click')
  clickInsideComponent() {
    this.clickInside = true;
  }

  @HostListener('document:click')
  clickout() {
    if (!this.clickInside && this.flagMobileMenuDrawerVisible) {
      this.toggleNavbar();
    }
    this.clickInside = false; 
  }

  toggleNavbar(): void {
    this.flagMobileMenuDrawerVisible = !this.flagMobileMenuDrawerVisible;
    if(this.flagMobileMenuDrawerVisible) {
      this._renderer.addClass(document.body, "no-scroll")
      return
    }

    this._renderer.removeClass(document.body, "no-scroll")
  }
}
