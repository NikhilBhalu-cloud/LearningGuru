import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { TopicService } from '../../services/topic.service';
import { Topic } from '../../models/section';
import { Router } from '@angular/router';
import { TreeNode } from 'primeng/api';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent implements OnInit {
  @Input() isCollapsed: boolean = false;
  @Output() collapseToggle = new EventEmitter<void>();

  treeData: TreeNode[] = [];
  selectedNode: TreeNode | null = null;

  constructor(private topicService: TopicService, private router: Router) {}

  ngOnInit(): void {
    this.loadTopicsTree();
  }

  loadTopicsTree(): void {
    this.topicService.getAllSections().subscribe((sections) => {
      this.treeData = sections.map((section) => {
        return {
          label: section.name,
          data: section.slug, // Using slug for routing
          icon: this.getSectionIcon(section.name),
          expanded: section.id === 'beginner',
          styleClass: 'section-node',
          children: section.topics.map((topic) => ({
            label: topic.name,
            data: {
              sectionSlug: section.slug,
              topicSlug: topic.slug,
            },
            icon: 'pi pi-book',
            styleClass: 'topic-node',
          })),
        };
      });
    });
  }

  getSectionIcon(section: string): string {
    switch (section) {
      case 'Beginner':
        return 'pi pi-star';
      case 'Intermediate':
        return 'pi pi-chart-line';
      case 'Advanced':
        return 'pi pi-trophy';
      default:
        return 'pi pi-folder';
    }
  }

  onNodeSelect(event: any): void {
    const node = event.node;

    // Check if it's a topic node by looking for sectionSlug and topicSlug
    if (
      node.data &&
      typeof node.data === 'object' &&
      node.data.sectionSlug &&
      node.data.topicSlug
    ) {
      // Navigate to the topic using the new route format
      this.router.navigate(['/', node.data.sectionSlug, node.data.topicSlug]);
    } else if (node.data && typeof node.data === 'string') {
      // It's a section node, navigate to the section
      this.router.navigate(['/', node.data]);
    }
  }

  toggleCollapse(): void {
    this.collapseToggle.emit();
  }
}
