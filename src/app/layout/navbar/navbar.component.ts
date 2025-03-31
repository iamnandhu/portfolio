import { Component, HostListener, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { trigger, state, style, animate, transition, query, stagger } from '@angular/animations';
import { Router } from '@angular/router';

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
    ]),
    trigger('fadeInStagger', [
      transition(':enter', [
        query('li', [
          style({ opacity: 0, transform: 'translateX(-20px)' }),
          stagger('100ms', [
            animate('300ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class NavbarComponent implements OnInit, AfterViewInit, OnDestroy {
  flagMobileMenuDrawerVisible = false;
  isScrolled = false;
  isExperienceSection = false;
  experienceSectionTop = 0;
  experienceSectionBottom = 0;
  private updateInterval: any;
  currentSection: string = '';
  private sectionPositions: { [key: string]: { top: number, bottom: number } } = {};
  private sections = ['skills', 'experiences', 'projects', 'contact'];

  constructor(private router: Router) { }

  ngOnInit() {
    // Initialize component
    // Set up regular updates for section bounds
    this.updateInterval = setInterval(() => {
      this.updateSectionBounds();
    }, 1000); // Update every second
  }

  ngAfterViewInit() {
    this.setupIntersectionObserver();
    // Get initial section positions
    setTimeout(() => {
      this.updateSectionBounds();
    }, 500);
  }

  ngOnDestroy() {
    // Clean up the interval
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }
  }

  updateSectionBounds() {
    // Update experience section bounds
    const experienceSection = document.getElementById('experiences');
    if (experienceSection) {
      const rect = experienceSection.getBoundingClientRect();
      this.experienceSectionTop = rect.top + window.scrollY;
      this.experienceSectionBottom = rect.bottom + window.scrollY;
    }

    // Update all section bounds
    this.sections.forEach(section => {
      const element = document.getElementById(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        this.sectionPositions[section] = {
          top: rect.top + window.scrollY,
          bottom: rect.bottom + window.scrollY
        };
      }
    });
  }

  setupIntersectionObserver() {
    // Create observer to detect when experience section is visible
    const options = {
      root: null, // viewport as root
      rootMargin: '0px',
      threshold: [0, 0.1, 0.5, 0.9, 1] // More thresholds for better precision
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.target.id === 'experiences') {
          // We only care if it's intersecting at all
          this.isExperienceSection = entry.isIntersecting;
        }
      });
    }, options);

    // Observe the experience section
    const experienceSection = document.getElementById('experiences');
    if (experienceSection) {
      observer.observe(experienceSection);
    }
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 100;

    // Precise detection based on scroll position
    const currentScroll = window.scrollY + window.innerHeight / 2; // Use middle of viewport
    this.isExperienceSection = currentScroll >= this.experienceSectionTop &&
      currentScroll <= this.experienceSectionBottom;

    // Update URL fragment based on current section
    this.updateActiveSection(currentScroll);
  }

  updateActiveSection(currentScroll: number) {
    let newSection = '';

    // If we're at the top of the page
    if (currentScroll < (this.sectionPositions['skills']?.top || 0)) {
      newSection = '';  // Home section
    } else {
      // Find which section we're currently in
      for (const section of this.sections) {
        const bounds = this.sectionPositions[section];
        if (bounds && currentScroll >= bounds.top && currentScroll <= bounds.bottom) {
          newSection = section;
          break;
        }
      }
    }

    // Only update if the section has changed
    if (newSection !== this.currentSection) {
      this.currentSection = newSection;
      // Update URL fragment without causing a scroll
      this.router.navigate([], {
        fragment: newSection,
        replaceUrl: true
      });
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    // Update section bounds when window is resized
    this.updateSectionBounds();
  }

  toggleNavbar() {
    this.flagMobileMenuDrawerVisible = !this.flagMobileMenuDrawerVisible;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    // Avoid immediate processing to prevent conflicts with button clicks
    setTimeout(() => {
      // Check if mobile menu is open
      if (!this.flagMobileMenuDrawerVisible) return;

      // Get references to elements
      const mobileDrawer = document.querySelector('.mobileDrawer');
      const hamburgerButton = document.querySelector('button[class*="md:hidden"]');

      // Check if click is outside both drawer and hamburger button
      if (mobileDrawer &&
        !mobileDrawer.contains(event.target as Node) &&
        !hamburgerButton?.contains(event.target as Node)) {
        this.flagMobileMenuDrawerVisible = false;
      }
    }, 50);
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
