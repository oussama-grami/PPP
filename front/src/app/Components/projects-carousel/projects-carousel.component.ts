import { Component, OnInit, HostListener, AfterViewInit, OnDestroy } from '@angular/core';
import { ProjectsService } from '../../Service/projects.service';
import { Project } from '../../Models/project';

declare var bootstrap: any;

@Component({
  selector: 'app-projects-carousel',
  templateUrl: './projects-carousel.component.html',
  styleUrls: ['./projects-carousel.component.css']
})
export class ProjectsCarouselComponent implements OnInit, AfterViewInit, OnDestroy {
  projects: Project[] = [];
  projectChunks: Project[][] = [];
  projectsPerSlide: number = 4; // Default
  carouselInstance: any;
  loading: boolean = true;

  // Track window width to prevent unnecessary updates
  private currentWindowWidth: number = window.innerWidth;

  constructor(private projectsService: ProjectsService) {}

  ngOnInit(): void {
    this.determineProjectsPerSlide(window.innerWidth);
    this.loadProjects();
  }

  ngAfterViewInit(): void {
    // We'll initialize the carousel after data is loaded
  }

  ngOnDestroy(): void {
    this.destroyCarousel();
  }

  loadProjects(): void {
    this.loading = true;
    this.projectsService.getProjects().subscribe({
      next: (data) => {
        this.projects = data;
        this.chunkProjects();
        this.loading = false;

        // Initialize carousel after data is loaded
        setTimeout(() => {
          this.initCarousel();
        }, 0);
      },
      error: (err) => {
        console.error('Error loading projects', err);
        this.loading = false;
      }
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    const newWidth = event.target.innerWidth;

    // Only respond to significant width changes (prevents flickering on mobile)
    if (Math.abs(this.currentWindowWidth - newWidth) > 20) {
      this.currentWindowWidth = newWidth;

      const oldProjectsPerSlide = this.projectsPerSlide;
      this.determineProjectsPerSlide(newWidth);

      // Only rechunk if the number of projects per slide has changed
      if (oldProjectsPerSlide !== this.projectsPerSlide) {
        this.chunkProjects();

        // Reinitialize carousel after rechunking
        setTimeout(() => {
          this.destroyCarousel();
          this.initCarousel();
        }, 0);
      }
    }
  }

  determineProjectsPerSlide(width: number): void {
    if (width >= 1200) {
      this.projectsPerSlide = 4; // Large screens: show 4 projects
    } else if (width >= 992) {
      this.projectsPerSlide = 3; // Medium screens: show 3 projects
    } else if (width >= 768) {
      this.projectsPerSlide = 2; // Small screens: show 2 projects
    } else {
      this.projectsPerSlide = 1; // Extra small screens: show 1 project
    }
  }

  chunkProjects(): void {
    this.projectChunks = [];

    // If no projects, return early
    if (!this.projects || this.projects.length === 0) {
      return;
    }

    for (let i = 0; i < this.projects.length; i += this.projectsPerSlide) {
      this.projectChunks.push(this.projects.slice(i, i + this.projectsPerSlide));
    }
  }

  initCarousel(): void {
    // Get the carousel element
    const carouselEl = document.getElementById('projectCarousel');
    if (carouselEl) {
      // Initialize Bootstrap carousel
      this.carouselInstance = new bootstrap.Carousel(carouselEl, {
        interval: 5000, // Set auto-rotation interval (5 seconds)
        wrap: true, // Allow carousel to cycle continuously
        keyboard: true, // React to keyboard events
        pause: 'hover' // Pause on mouse hover
      });
    }
  }

  destroyCarousel(): void {
    if (this.carouselInstance) {
      this.carouselInstance.dispose();
      this.carouselInstance = null;
    }
  }

  // Navigate carousel manually
  prev(): void {
    if (this.carouselInstance) {
      this.carouselInstance.prev();
    }
  }

  next(): void {
    if (this.carouselInstance) {
      this.carouselInstance.next();
    }
  }
}
