import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopicCardComponent } from '../../components/topic-card/topic-card.component';
import { TopicService } from '../../services/topic.service';
import { Topic } from '../../models/topic.model';

@Component({
  selector: 'app-advanced',
  standalone: true,
  imports: [CommonModule, TopicCardComponent],
  templateUrl: './advanced.component.html',
  styleUrl: './advanced.component.css'
})
export class AdvancedComponent implements OnInit {
  topics: Topic[] = [];
  filteredTopics: Topic[] = [];

  constructor(private topicService: TopicService) {}

  ngOnInit(): void {
    this.loadTopics();
    this.topicService.searchTerm$.subscribe(() => {
      this.filterTopics();
    });
  }

  loadTopics(): void {
    this.topics = this.topicService.getTopicsByLevel('advanced');
    this.filteredTopics = [...this.topics];
  }

  filterTopics(): void {
    this.filteredTopics = this.topics;
  }

  onToggleCompletion(topicId: string): void {
    this.topicService.toggleTopicCompletion(topicId);
    this.loadTopics();
  }
}
