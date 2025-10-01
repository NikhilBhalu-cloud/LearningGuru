import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Input() sectionName: string = '';
  @Input() currentTopic: number = 0;
  @Input() totalTopics: number = 0;

  constructor(private router: Router) {}

  get progressPercent(): number {
    if (this.totalTopics === 0) return 0;
    return (this.currentTopic / this.totalTopics) * 100;
  }

  goHome(): void {
    this.router.navigate(['/']);
  }
}
