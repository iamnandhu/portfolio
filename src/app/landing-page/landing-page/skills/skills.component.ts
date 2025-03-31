import { Component, OnInit, AfterViewInit, ElementRef, Renderer2, HostListener, ViewChild } from '@angular/core';

interface Skill {
  name: string;
  icon: string;
}

interface SkillCategory {
  title: string;
  skills: Skill[];
}

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit, AfterViewInit {
  @ViewChild('categoryContainer') categoryContainer!: ElementRef;

  skillCategories: SkillCategory[] = [
    {
      title: 'Backend',
      skills: [
        { name: 'Golang', icon: 'devicon-go-original-wordmark' },
        { name: 'Python', icon: 'devicon-python-plain' },
        { name: 'MongoDB', icon: 'devicon-mongodb-plain' },
        { name: 'API Development', icon: 'material-icons settings_ethernet' },
        { name: 'FastAPI', icon: 'devicon-fastapi-plain' },
        { name: 'Gin-gonic', icon: 'devicon-go-plain' }
      ]
    },
    {
      title: 'Frontend',
      skills: [
        { name: 'Angular', icon: 'devicon-angularjs-plain' },
        { name: 'JavaScript', icon: 'devicon-javascript-plain' },
        { name: 'TypeScript', icon: 'devicon-typescript-plain' },
        { name: 'HTML5', icon: 'devicon-html5-plain' },
        { name: 'CSS3', icon: 'devicon-css3-plain' },
        { name: 'Tailwind', icon: 'devicon-tailwindcss-plain' }
      ]
    },
    {
      title: 'Tools & DevOps',
      skills: [
        { name: 'Git', icon: 'devicon-git-plain' },
        { name: 'GitHub', icon: 'devicon-github-original' },
        { name: 'Docker', icon: 'devicon-docker-plain' },
        { name: 'AWS', icon: 'devicon-amazonwebservices-plain-wordmark' },
        { name: 'OpenAI', icon: 'material-icons smart_toy' },
        { name: 'Google Gemini', icon: 'material-icons auto_awesome' }
      ]
    }
  ];

  activeCategory: string = 'Backend';
  hoveredSkill: string | null = null;
  touchStartX: number = 0;
  touchEndX: number = 0;
  touchThreshold: number = 50; // Minimum swipe distance to trigger navigation
  isMobile: boolean = false;
  swipeDirection: 'left' | 'right' | null = null;
  isAnimating: boolean = false;
  showGuide: boolean = false;
  guideTimeout: any = null;

  constructor(private renderer: Renderer2, private el: ElementRef) { }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkIfMobile();
  }

  ngOnInit(): void {
    this.checkIfMobile();

    // Show guide on mobile
    if (this.isMobile) {
      // Force reset for testing
      localStorage.removeItem('hasSeenSkillsGuide');

      // Always show the guide for now
      this.showGuide = true;
      console.log('Guide visibility forced to:', this.showGuide);

      // Auto-hide after 8 seconds if user doesn't interact
      if (this.showGuide) {
        this.guideTimeout = setTimeout(() => {
          this.showGuide = false;
          localStorage.setItem('hasSeenSkillsGuide', 'true');
        }, 8000);
      }
    }
  }

  ngAfterViewInit(): void {
    // Initially scroll the active category into view
    setTimeout(() => this.scrollActiveCategoryToMiddle(), 300);
  }

  ngOnDestroy(): void {
    // Clear timeout if component is destroyed
    if (this.guideTimeout) {
      clearTimeout(this.guideTimeout);
    }
  }

  checkIfMobile(): void {
    // Check window width - standard breakpoint for mobile devices
    const isMobileWidth = window.innerWidth <= 768;

    // Additional check for touch devices
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    this.isMobile = isMobileWidth || isTouchDevice;

    console.log('Is mobile:', this.isMobile, 'Window width:', window.innerWidth,
      'Is touch device:', isTouchDevice);
  }

  setActiveCategory(category: string): void {
    if (this.isAnimating || this.activeCategory === category) return;

    // Determine direction for animation
    const currentIndex = this.skillCategories.findIndex(cat => cat.title === this.activeCategory);
    const newIndex = this.skillCategories.findIndex(cat => cat.title === category);
    this.swipeDirection = currentIndex < newIndex ? 'left' : 'right';

    // Switch categories with animation
    this.animateCategoryTransition(category);
  }

  animateCategoryTransition(newCategory: string): void {
    this.isAnimating = true;

    // Find the current and new category elements
    const currentCategoryEl = this.el.nativeElement.querySelector(`.skills-category.active-category`);
    const newCategoryEl = this.el.nativeElement.querySelector(
      `.skills-category:not(.active-category)[class*="${newCategory}"]`
    );

    if (!currentCategoryEl || !newCategoryEl) {
      // Fallback if elements not found
      this.activeCategory = newCategory;
      this.scrollActiveCategoryToMiddle();
      this.isAnimating = false;
      return;
    }

    // Prepare new category for animation
    if (this.swipeDirection === 'left') {
      // Coming from right
      this.renderer.setStyle(newCategoryEl, 'transform', 'translateX(30px)');
      this.renderer.setStyle(currentCategoryEl, 'transform', 'translateX(0)');
    } else {
      // Coming from left
      this.renderer.setStyle(newCategoryEl, 'transform', 'translateX(-30px)');
      this.renderer.setStyle(currentCategoryEl, 'transform', 'translateX(0)');
    }

    this.renderer.setStyle(newCategoryEl, 'opacity', '0');
    this.renderer.setStyle(newCategoryEl, 'transition', 'opacity 0.5s ease, transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)');

    // Start animation out for current category
    if (this.swipeDirection === 'left') {
      this.renderer.setStyle(currentCategoryEl, 'transform', 'translateX(-30px)');
    } else {
      this.renderer.setStyle(currentCategoryEl, 'transform', 'translateX(30px)');
    }
    this.renderer.setStyle(currentCategoryEl, 'opacity', '0');

    // Change active category after animation
    setTimeout(() => {
      this.activeCategory = newCategory;
      this.renderer.setStyle(newCategoryEl, 'transform', 'translateX(0)');
      this.renderer.setStyle(newCategoryEl, 'opacity', '1');

      // Center the active category button
      setTimeout(() => {
        this.scrollActiveCategoryToMiddle();
        this.isAnimating = false;
      }, 300); // Increase timeout to ensure UI has stabilized
    }, 300);
  }

  setHoveredSkill(skillName: string | null): void {
    this.hoveredSkill = skillName;
  }

  isHovered(skillName: string): boolean {
    return this.hoveredSkill === skillName;
  }

  // Scroll active category to middle of container
  scrollActiveCategoryToMiddle(): void {
    if (!this.isMobile || !this.categoryContainer) return;

    // Use requestAnimationFrame to ensure DOM is ready
    requestAnimationFrame(() => {
      const activeCategoryElement = document.getElementById(`category-${this.activeCategory}`);
      if (!activeCategoryElement) return;

      const containerEl = this.categoryContainer.nativeElement;
      const containerWidth = containerEl.offsetWidth;
      const categoryWidth = activeCategoryElement.offsetWidth;
      const scrollLeft = activeCategoryElement.offsetLeft - (containerWidth / 2) + (categoryWidth / 2);

      // Use smooth scrolling
      containerEl.scrollTo({
        left: scrollLeft,
        behavior: 'smooth'
      });
    });
  }

  // Touch swipe handlers for categories
  onCategoryTouchStart(event: TouchEvent): void {
    this.touchStartX = event.touches[0].clientX;
  }

  onCategoryTouchEnd(event: TouchEvent): void {
    this.touchEndX = event.changedTouches[0].clientX;
    this.handleSwipe();
  }

  // Touch swipe handlers for skills grid
  onSkillsGridTouchStart(event: TouchEvent): void {
    this.touchStartX = event.touches[0].clientX;
    console.log('Touch start event detected');
  }

  onSkillsGridTouchEnd(event: TouchEvent): void {
    this.touchEndX = event.changedTouches[0].clientX;

    // Calculate swipe distance
    const swipeDistance = this.touchEndX - this.touchStartX;

    // Log the swipe for debugging
    if (Math.abs(swipeDistance) >= this.touchThreshold) {
      console.log('Swipe detected with distance:', swipeDistance);
    }

    this.handleSwipe();
  }

  // Universal swipe handler for both category and skills grid
  handleSwipe(): void {
    if (!this.isMobile || this.isAnimating) return;

    const swipeDistance = this.touchEndX - this.touchStartX;
    if (Math.abs(swipeDistance) < this.touchThreshold) return;

    // Dismiss the swipe guide when there's a valid swipe
    this.dismissGuide();

    const currentIndex = this.skillCategories.findIndex(
      category => category.title === this.activeCategory
    );

    if (swipeDistance > 0) {
      // Swipe right - go to previous category
      if (currentIndex > 0) {
        this.swipeDirection = 'right';
        const prevCategory = this.skillCategories[currentIndex - 1].title;
        this.animateCategoryTransition(prevCategory);
      }
    } else {
      // Swipe left - go to next category
      if (currentIndex < this.skillCategories.length - 1) {
        this.swipeDirection = 'left';
        const nextCategory = this.skillCategories[currentIndex + 1].title;
        this.animateCategoryTransition(nextCategory);
      }
    }
  }

  // Dismiss guide manually if user interacts
  dismissGuide(): void {
    console.log('Dismissing swipe guide, current value:', this.showGuide);
    this.showGuide = false;

    // Clear any existing timeout
    if (this.guideTimeout) {
      clearTimeout(this.guideTimeout);
      this.guideTimeout = null;
    }

    // Remember that user has seen the guide
    localStorage.setItem('hasSeenSkillsGuide', 'true');
  }

  // Navigate to the previous category
  navigateToPreviousCategory(): void {
    if (this.isAnimating) return;

    const currentIndex = this.skillCategories.findIndex(
      category => category.title === this.activeCategory
    );

    if (currentIndex > 0) {
      this.swipeDirection = 'right';
      const prevCategory = this.skillCategories[currentIndex - 1].title;
      this.animateCategoryTransition(prevCategory);

      // Dismiss guide on navigation
      this.dismissGuide();
    }
  }

  // Navigate to the next category
  navigateToNextCategory(): void {
    if (this.isAnimating) return;

    const currentIndex = this.skillCategories.findIndex(
      category => category.title === this.activeCategory
    );

    if (currentIndex < this.skillCategories.length - 1) {
      this.swipeDirection = 'left';
      const nextCategory = this.skillCategories[currentIndex + 1].title;
      this.animateCategoryTransition(nextCategory);

      // Dismiss guide on navigation
      this.dismissGuide();
    }
  }
}

