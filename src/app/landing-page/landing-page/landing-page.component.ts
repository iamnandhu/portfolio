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
    const navbarOffset = 64; // Standard offset for consistency

    // Handle scroll to top
    if (componentId === 'top' || componentId === '') {
      // Update URL fragment first (remove fragment)
      this._router.navigate([], { fragment: undefined, replaceUrl: true });
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      return;
    }

    // Determine the target element based on componentId
    switch (componentId) {
      case 'home':
        element = this.homeComponent;
        break;
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

    // Proceed if the element exists
    if (element?.nativeElement) {
    // Set current section
      this.currentSection = componentId;

      // Update URL fragment before scrolling
      this._router.navigate([], {
        fragment: componentId,
        replaceUrl: true
      });

      // Get the element's position
      const elementTop = element.nativeElement.getBoundingClientRect().top + window.pageYOffset;
      const targetScrollPosition = elementTop - navbarOffset;

      // Use requestAnimationFrame for smoother animation
      const startPosition = window.pageYOffset;
      const distance = targetScrollPosition - startPosition;
      const duration = 800; // Duration in milliseconds
      let start: number | null = null;

      const animation = (currentTime: number) => {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const progress = Math.min(timeElapsed / duration, 1);

        // Easing function for smooth acceleration and deceleration
        const easeInOutCubic = (t: number) => {
          return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        };

        window.scrollTo(0, startPosition + (distance * easeInOutCubic(progress)));

        if (timeElapsed < duration) {
          requestAnimationFrame(animation);
        }
      };

      requestAnimationFrame(animation);
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
