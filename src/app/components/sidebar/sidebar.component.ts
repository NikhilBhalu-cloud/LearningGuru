import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TopicService } from '../../services/topic.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  @Input() isOpen: boolean = true;

  beginnerProgress: number = 0;
  intermediateProgress: number = 0;
  advancedProgress: number = 0;
  overallProgress: number = 0;

  constructor(private topicService: TopicService) {
    this.updateProgress();
  }

  updateProgress(): void {
    this.beginnerProgress = this.topicService.getCompletionPercentage('beginner');
    this.intermediateProgress = this.topicService.getCompletionPercentage('intermediate');
    this.advancedProgress = this.topicService.getCompletionPercentage('advanced');
    this.overallProgress = this.topicService.getCompletionPercentage();
  }
}
