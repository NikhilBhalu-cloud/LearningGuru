import {
  Component,
  Output,
  EventEmitter,
  Input,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ThemeService } from '../../services/theme.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit, OnDestroy {
  @Input() sectionName: string = '';
  @Input() currentTopic: number = 0;
  @Input() totalTopics: number = 0;
  @Output() sidebarToggle = new EventEmitter<void>();

  isDarkMode: boolean = false;
  profileMenuItems: MenuItem[] = [];
  private themeSubscription: Subscription = new Subscription();

  constructor(private router: Router, private themeService: ThemeService) {
    this.initializeProfileMenu();
  }

  ngOnInit(): void {
    // Subscribe to dark mode changes
    this.themeSubscription = this.themeService.darkMode$.subscribe((isDark) => {
      this.isDarkMode = isDark;
    });
  }

  ngOnDestroy(): void {
    // Clean up subscription when component is destroyed
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
  }

  initializeProfileMenu(): void {
    this.profileMenuItems = [
      {
        label: 'Profile',
        icon: 'pi pi-user',
        command: () => this.navigateToProfile(),
      },
      {
        label: 'Settings',
        icon: 'pi pi-cog',
        command: () => this.navigateToSettings(),
      },
      {
        separator: true,
      },
      {
        label: 'Logout',
        icon: 'pi pi-sign-out',
        command: () => this.logout(),
      },
    ];
  }

  toggleSidebar(): void {
    this.sidebarToggle.emit();
  }

  toggleDarkMode(): void {
    this.themeService.toggleDarkMode();
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
    return this.totalTopics > 0
      ? (this.currentTopic / this.totalTopics) * 100
      : 0;
  }
}
