import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private darkMode = new BehaviorSubject<boolean>(false);
  darkMode$ = this.darkMode.asObservable();

  constructor() {
    // Check if user previously selected dark mode
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      this.darkMode.next(true);
      document.body.classList.add('dark-theme');
    }
  }

  toggleTheme(): void {
    const isDarkMode = !this.darkMode.value;
    this.darkMode.next(isDarkMode);

    if (isDarkMode) {
      document.body.classList.add('dark-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-theme');
      localStorage.setItem('theme', 'light');
    }
  }

  isDarkMode(): boolean {
    return this.darkMode.value;
  }
}
