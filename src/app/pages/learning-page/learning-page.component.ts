import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TopicService } from '../../services/topic.service';
import { Topic } from '../../models/topic';
import { trigger, transition, style, animate } from '@angular/animations';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-learning-page',
  templateUrl: './learning-page.component.html',
  styleUrl: './learning-page.component.css',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate(
          '300ms ease-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
    ]),
  ],
})
export class LearningPageComponent implements OnInit {
  currentTopic: Topic | null = null;
  hasPrevious: boolean = false;
  hasNext: boolean = false;
  progress = { current: 0, total: 0, section: '' };

  constructor(
    private topicService: TopicService,
    private router: Router,
    private route: ActivatedRoute,
    private clipboard: Clipboard
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const topicIndex = params['topic'] ? parseInt(params['topic']) : 0;
      this.loadTopicByIndex(topicIndex);
    });
  }

  loadTopicByIndex(index: number): void {
    this.topicService.getTopicByIndex(index).subscribe((topic) => {
      if (topic) {
        this.currentTopic = topic;
        this.progress = this.topicService.getTopicProgress(topic.id);
        this.updateNavigationState();
      }
    });
  }

  loadNextTopic(): void {
    if (this.currentTopic) {
      this.topicService
        .getNextTopic(this.currentTopic.id)
        .subscribe((nextTopic) => {
          if (nextTopic) {
            const nextIndex = this.progress.current;
            this.router.navigate(['/learn'], {
              queryParams: { topic: nextIndex },
            });
          }
        });
    }
  }

  loadPreviousTopic(): void {
    if (this.currentTopic) {
      this.topicService
        .getPreviousTopic(this.currentTopic.id)
        .subscribe((prevTopic) => {
          if (prevTopic) {
            const prevIndex = this.progress.current - 2;
            this.router.navigate(['/learn'], {
              queryParams: { topic: prevIndex },
            });
          }
        });
    }
  }

  updateNavigationState(): void {
    if (this.currentTopic) {
      this.topicService
        .getPreviousTopic(this.currentTopic.id)
        .subscribe((prev) => {
          this.hasPrevious = !!prev;
        });
      this.topicService.getNextTopic(this.currentTopic.id).subscribe((next) => {
        this.hasNext = !!next;
      });
    }
  }

  copyCode(): void {
    if (this.currentTopic) {
      this.clipboard.copy(this.currentTopic.codeExample);
    }
  }
}
