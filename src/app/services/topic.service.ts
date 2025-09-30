import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Topic } from '../models/topic.model';
import { TOPICS_DATA } from '../data/topics.data';

@Injectable({
  providedIn: 'root'
})
export class TopicService {
  private topics: Topic[] = [];
  private searchTermSubject = new BehaviorSubject<string>('');
  public searchTerm$ = this.searchTermSubject.asObservable();

  constructor() {
    this.loadTopics();
    this.loadCompletionStatus();
  }

  private loadTopics(): void {
    this.topics = [...TOPICS_DATA];
  }

  private loadCompletionStatus(): void {
    const stored = localStorage.getItem('completedTopics');
    if (stored) {
      const completedIds = JSON.parse(stored);
      this.topics.forEach(topic => {
        topic.completed = completedIds.includes(topic.id);
      });
    }
  }

  private saveCompletionStatus(): void {
    const completedIds = this.topics
      .filter(t => t.completed)
      .map(t => t.id);
    localStorage.setItem('completedTopics', JSON.stringify(completedIds));
  }

  getTopicsByLevel(level: 'beginner' | 'intermediate' | 'advanced'): Topic[] {
    return this.topics.filter(t => t.level === level);
  }

  getTopicById(id: string): Topic | undefined {
    return this.topics.find(t => t.id === id);
  }

  getAllTopics(): Topic[] {
    return this.topics;
  }

  searchTopics(searchTerm: string): Topic[] {
    this.searchTermSubject.next(searchTerm);
    
    if (!searchTerm.trim()) {
      return this.topics;
    }

    const term = searchTerm.toLowerCase();
    return this.topics.filter(topic => 
      topic.title.toLowerCase().includes(term) ||
      topic.explanation.toLowerCase().includes(term) ||
      topic.keyPoints.some(point => point.toLowerCase().includes(term))
    );
  }

  toggleTopicCompletion(id: string): void {
    const topic = this.topics.find(t => t.id === id);
    if (topic) {
      topic.completed = !topic.completed;
      this.saveCompletionStatus();
    }
  }

  getCompletionPercentage(level?: 'beginner' | 'intermediate' | 'advanced'): number {
    const relevantTopics = level 
      ? this.topics.filter(t => t.level === level)
      : this.topics;
    
    if (relevantTopics.length === 0) return 0;
    
    const completed = relevantTopics.filter(t => t.completed).length;
    return Math.round((completed / relevantTopics.length) * 100);
  }
}
