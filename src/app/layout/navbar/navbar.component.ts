import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule],
  animations: [
    trigger('openClose', [
      state('open', style({
        transform: 'translateX(0%)'
      })),
      state('closed', style({
        transform: 'translateX(100%)'
      })),
      transition('open => closed', [
        animate('0.3s ease-in-out')
      ]),
      transition('closed => open', [
        animate('0.3s ease-in-out')
      ])
    ]),
    trigger('floatingNavbar', [
      state('visible', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),
      state('hidden', style({
        opacity: 0,
        transform: 'translateX(100%)'
      })),
      transition('hidden => visible', [
        animate('0.3s ease-out')
      ]),
      transition('visible => hidden', [
        animate('0.3s ease-in')
      ])
    ])
  ]
})
export class NavbarComponent {
  flagMobileMenuDrawerVisible = false;
  isScrolled = false;

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 100;
  }

  toggleNavbar() {
    this.flagMobileMenuDrawerVisible = !this.flagMobileMenuDrawerVisible;
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  scrollToComponent(componentId: string) {
    this.flagMobileMenuDrawerVisible = false;
    const element = document.getElementById(componentId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
