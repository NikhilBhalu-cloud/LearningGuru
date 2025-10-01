import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { TopicService } from '../../services/topic.service';
import { Topic } from '../../models/topic';
import { Router } from '@angular/router';
import { TreeNode } from 'primeng/api';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  @Input() isCollapsed: boolean = false;
  @Output() collapseToggle = new EventEmitter<void>();
  
  treeData: TreeNode[] = [];
  selectedNode: TreeNode | null = null;

  constructor(
    private topicService: TopicService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadTopicsTree();
  }

  loadTopicsTree(): void {
    this.topicService.getAllTopics().subscribe((topics: Topic[]) => {
      const sections = ['Beginner', 'Intermediate', 'Advanced'];
      
      this.treeData = sections.map(section => {
        const sectionTopics = topics.filter(t => t.section === section);
        
        return {
          label: section,
          data: section,
          icon: this.getSectionIcon(section),
          expanded: section === 'Beginner',
          styleClass: 'section-node',
          children: sectionTopics.map((topic, index) => ({
            label: topic.name,
            data: topic.id,
            icon: 'pi pi-book',
            styleClass: 'topic-node',
            topicIndex: topics.indexOf(topic)
          }))
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
    
    // Only navigate if it's a topic node (not a section node)
    if (node.data && node.data !== 'Beginner' && node.data !== 'Intermediate' && node.data !== 'Advanced') {
      const topicIndex = node.topicIndex;
      this.router.navigate(['/learn'], {
        queryParams: { topic: topicIndex }
      });
    }
  }

  toggleCollapse(): void {
    this.collapseToggle.emit();
  }
}
