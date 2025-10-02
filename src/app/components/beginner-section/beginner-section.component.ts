import { Component, OnInit } from '@angular/core';
import { TopicService } from '../../services/topic.service';
import { Topic } from '../../models/section';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-beginner-section',
  templateUrl: './beginner-section.component.html',
  styleUrls: ['./beginner-section.component.css'],
})
export class BeginnerSectionComponent implements OnInit {
  topics: Topic[] = [];
  loading: boolean = true;

  constructor(
    private topicService: TopicService,
    private clipboard: Clipboard
  ) {}

  ngOnInit(): void {
    this.loadTopics();
  }

  loadTopics(): void {
    this.topicService.getTopicsBySection('Beginner').subscribe({
      next: (data) => {
        this.topics = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading topics:', error);
        this.loading = false;
      },
    });
  }

  copyCode(code: string): void {
    this.clipboard.copy(code);
    // You could add a snackbar notification here
    console.log('Code copied to clipboard!');
  }
}
