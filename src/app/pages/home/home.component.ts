import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TopicService } from '../../services/topic.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  beginnerProgress: number = 0;
  intermediateProgress: number = 0;
  advancedProgress: number = 0;

  constructor(private topicService: TopicService) {
    this.loadProgress();
  }

  loadProgress(): void {
    this.beginnerProgress = this.topicService.getCompletionPercentage('beginner');
    this.intermediateProgress = this.topicService.getCompletionPercentage('intermediate');
    this.advancedProgress = this.topicService.getCompletionPercentage('advanced');
  }
}
