import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  @Input() sectionName: string = '';
  @Input() currentTopic: number = 0;
  @Input() totalTopics: number = 0;
  @Output() sidebarToggle = new EventEmitter<void>();
  
  isDarkMode: boolean = false;
  profileMenuItems: MenuItem[] = [];

  constructor(private router: Router) {
    this.initializeProfileMenu();
    this.loadThemePreference();
  }

  initializeProfileMenu(): void {
    this.profileMenuItems = [
      {
        label: 'Profile',
        icon: 'pi pi-user',
        command: () => this.navigateToProfile()
      },
      {
        label: 'Settings',
        icon: 'pi pi-cog',
        command: () => this.navigateToSettings()
      },
      {
        separator: true
      },
      {
        label: 'Logout',
        icon: 'pi pi-sign-out',
        command: () => this.logout()
      }
    ];
  }

  loadThemePreference(): void {
    const savedTheme = localStorage.getItem('theme');
    this.isDarkMode = savedTheme === 'dark';
    this.applyTheme();
  }

  toggleSidebar(): void {
    this.sidebarToggle.emit();
  }

  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
    this.applyTheme();
    localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
  }

  applyTheme(): void {
    if (this.isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  goHome(): void {
    this.router.navigate(['/']);
  }

  navigateToProfile(): void {
    console.log('Navigate to profile');
    // Implement profile navigation
  }

  navigateToSettings(): void {
    console.log('Navigate to settings');
    // Implement settings navigation
  }

  logout(): void {
    console.log('Logout');
    // Implement logout logic
  }

  get progressPercent(): number {
    return this.totalTopics > 0 ? (this.currentTopic / this.totalTopics) * 100 : 0;
  }
}
