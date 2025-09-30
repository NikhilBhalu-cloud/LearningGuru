import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Topic } from '../../models/topic.model';

@Component({
  selector: 'app-topic-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './topic-card.component.html',
  styleUrl: './topic-card.component.css'
})
export class TopicCardComponent {
  @Input() topic!: Topic;
  @Output() toggleCompletion = new EventEmitter<string>();
  
  isExpanded: boolean = false;

  toggleExpand(): void {
    this.isExpanded = !this.isExpanded;
  }

  onToggleCompletion(): void {
    this.toggleCompletion.emit(this.topic.id);
  }

  copyCode(code: string): void {
    navigator.clipboard.writeText(code).then(() => {
      alert('Code copied to clipboard!');
    });
  }
}
