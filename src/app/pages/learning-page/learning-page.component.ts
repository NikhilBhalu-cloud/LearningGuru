import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TopicService } from '../../services/topic.service';
import { Topic } from '../../models/section';
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
  @ViewChild('contentSection') contentSection!: ElementRef;

  currentTopic: Topic | null = null;
  hasPrevious: boolean = false;
  hasNext: boolean = false;
  progress = { current: 0, total: 0, section: '' };
  isSidebarCollapsed: boolean = false;

  constructor(
    private topicService: TopicService,
    private router: Router,
    private route: ActivatedRoute,
    private clipboard: Clipboard
  ) {
    this.loadSidebarState();
  }

  ngOnInit(): void {
    // Subscribe to route changes
    this.route.paramMap.subscribe((params) => {
      const section = params.get('section');
      const topic = params.get('topic');

      if (section && topic) {
        // New route format: /:section/:topic
        this.loadTopicBySlug(section, topic);
      } else if (section) {
        // Section only: /:section - load first topic from section
        this.loadFirstTopicFromSection(section);
      } else {
        // Legacy format or home page
        this.route.queryParams.subscribe((queryParams) => {
          const topicIndex = queryParams['topic']
            ? parseInt(queryParams['topic'])
            : 0;
          this.loadTopicByIndex(topicIndex);
        });
      }
    });
  }

  loadTopicBySlug(sectionSlug: string, topicSlug: string): void {
    this.topicService.getTopicBySlug(sectionSlug, topicSlug).subscribe({
      next: (topic) => {
        if (topic) {
          this.currentTopic = topic;
          this.progress = this.topicService.getTopicProgress(topic.id);
          this.updateNavigationState();

          // Scroll to top after topic change
          setTimeout(() => this.scrollToTop(), 0);
        }
      },
      error: (error) => {
        console.error('Error loading topic:', error);
        // Redirect to home or first topic if topic not found
        this.router.navigate(['/']);
      },
    });
  }

  loadFirstTopicFromSection(sectionSlug: string): void {
    this.topicService.getSectionBySlug(sectionSlug).subscribe({
      next: (section) => {
        if (section && section.topics.length > 0) {
          const firstTopic = section.topics[0];
          // Redirect to the full path with topic
          this.router.navigate(['/', sectionSlug, firstTopic.slug || '']);
        } else {
          // Section has no topics or doesn't exist
          this.router.navigate(['/']);
        }
      },
      error: () => {
        this.router.navigate(['/']);
      },
    });
  }

  loadTopicByIndex(index: number): void {
    this.topicService.getTopicByIndex(index).subscribe((topic) => {
      if (topic) {
        this.currentTopic = topic;
        this.progress = this.topicService.getTopicProgress(topic.id);
        this.updateNavigationState();

        // Scroll to top after topic change (timeout to ensure DOM is updated)
        setTimeout(() => this.scrollToTop(), 0);
      }
    });
  }

  loadNextTopic(): void {
    if (this.currentTopic) {
      this.topicService
        .getNextTopic(this.currentTopic.id)
        .subscribe((nextTopic) => {
          if (nextTopic) {
            const sectionId = nextTopic.sectionId;
            const topicSlug = nextTopic.slug;

            if (sectionId && topicSlug) {
              // Find section slug from section ID
              this.topicService
                .getSectionById(sectionId)
                .subscribe((section) => {
                  if (section) {
                    // Navigate to new format URL
                    this.router.navigate(['/', section.slug, topicSlug]);
                  } else {
                    // Fallback to legacy format
                    const nextIndex = this.progress.current;
                    this.router.navigate(['/learn'], {
                      queryParams: { topic: nextIndex },
                    });
                  }
                });
            } else {
              // Fallback to legacy format if slug not available
              const nextIndex = this.progress.current;
              this.router.navigate(['/learn'], {
                queryParams: { topic: nextIndex },
              });
            }
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
            const sectionId = prevTopic.sectionId;
            const topicSlug = prevTopic.slug;

            if (sectionId && topicSlug) {
              // Find section slug from section ID
              this.topicService
                .getSectionById(sectionId)
                .subscribe((section) => {
                  if (section) {
                    // Navigate to new format URL
                    this.router.navigate(['/', section.slug, topicSlug]);
                  } else {
                    // Fallback to legacy format
                    const prevIndex = this.progress.current - 2;
                    this.router.navigate(['/learn'], {
                      queryParams: { topic: prevIndex },
                    });
                  }
                });
            } else {
              // Fallback to legacy format if slug not available
              const prevIndex = this.progress.current - 2;
              this.router.navigate(['/learn'], {
                queryParams: { topic: prevIndex },
              });
            }
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

  scrollToTop(): void {
    if (this.contentSection && this.contentSection.nativeElement) {
      this.contentSection.nativeElement.scrollTop = 0;
    }
  }

  copyCode(): void {
    if (this.currentTopic) {
      this.clipboard.copy(this.currentTopic.codeExample);
    }
  }

  toggleSidebar(): void {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
    localStorage.setItem(
      'sidebarCollapsed',
      this.isSidebarCollapsed.toString()
    );
  }

  loadSidebarState(): void {
    const savedState = localStorage.getItem('sidebarCollapsed');
    if (savedState !== null) {
      this.isSidebarCollapsed = savedState === 'true';
    }
  }
}
