import { Component, Output, EventEmitter } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TopicService } from '../../services/topic.service';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent {
  @Output() sidebarToggle = new EventEmitter<void>();
  searchTerm: string = '';
  showSearch: boolean = false;

  constructor(private topicService: TopicService) {}

  onSearch(): void {
    this.topicService.searchTopics(this.searchTerm);
  }

  toggleSearch(): void {
    this.showSearch = !this.showSearch;
    if (!this.showSearch) {
      this.searchTerm = '';
      this.onSearch();
    }
  }

  onSidebarToggle(): void {
    this.sidebarToggle.emit();
  }
}
