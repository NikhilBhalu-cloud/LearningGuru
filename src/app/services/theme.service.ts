import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private darkMode = new BehaviorSubject<boolean>(false);
  darkMode$ = this.darkMode.asObservable();

  constructor() { 
    this.loadSavedTheme();
  }

  private loadSavedTheme(): void {
    // Check local storage
    const savedTheme = localStorage.getItem('theme');
    
    // Check if user prefers dark mode at system level
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Set dark mode if explicitly saved as dark or if system prefers dark and no saved preference
    const isDarkMode = savedTheme === 'dark' || (prefersDark && !savedTheme);
    
    this.setDarkMode(isDarkMode);
  }

  setDarkMode(isDark: boolean): void {
    // Update observable
    this.darkMode.next(isDark);
    
    // Save to local storage
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    
    // Apply to document
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  toggleDarkMode(): void {
    this.setDarkMode(!this.darkMode.value);
  }

  get isDarkMode(): boolean {
    return this.darkMode.value;
  }
}