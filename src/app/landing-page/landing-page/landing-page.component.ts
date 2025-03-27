import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { MenuService } from '../menu.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  @ViewChild('skillsComponent', { static: false }) skillsComponent: ElementRef | undefined;
  @ViewChild('experienceComponent') experienceComponent: ElementRef | undefined;
  @ViewChild('homeComponent') homeComponent: ElementRef | undefined;
  @ViewChild('projectsComponent') projectsComponent: ElementRef | undefined;
  @ViewChild('contactComponent') contactComponent: ElementRef | undefined;
  @ViewChild('topComponent') topComponent: ElementRef | undefined;
  private subscription: Subscription;
  private currentSection: string = '';

  constructor(
    private _menuService: MenuService,
    private _router: Router
  ) {
    this.subscription = this._menuService.scrollToComponent$.subscribe(componentId => {
      this.scrollToComponent(componentId);
    });
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {

  }

  scrollToComponent(componentId: string) {
    let element: ElementRef | undefined;

    // Special case for top and home - we want to show the navbar
    if (componentId === 'top' || componentId === '') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      return;
    }

    // Handle special case for home - scroll to home but leave space for navbar
    if (componentId === 'home') {
      element = this.homeComponent;
      if (element && element.nativeElement) {
        setTimeout(() => {
          element?.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
          window.scrollBy(0, -80); // Space for navbar
        });
      }
      return;
    }

    // Handle other sections
    switch (componentId) {
      case 'skills':
        element = this.skillsComponent;
        break;
      case 'experiences':
        element = this.experienceComponent;
        break;
      case 'projects':
        element = this.projectsComponent;
        break;
      case 'contact':
        element = this.contactComponent;
        break;
    }

    if (element && element.nativeElement) {
      // Set current section immediately to prevent updateActiveSection from overriding
      // This prevents the jumping behavior
      this.currentSection = componentId;

      // Scroll to element
      element.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });

      // Apply offset, but wait a bit to make sure the scrolling has completed
      setTimeout(() => {
        window.scrollBy(0, -64); // Adjust for navbar/header

        // Update URL fragment directly rather than waiting for scroll detection
        this._router.navigate([], {
          fragment: componentId,
          replaceUrl: true
        });
      }, 100);
    }
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
