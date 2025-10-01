import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent {
  @Input() hasPrevious: boolean = false;
  @Input() hasNext: boolean = false;
  @Output() previous = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();

  onPrevious(): void {
    this.previous.emit();
  }

  onNext(): void {
    this.next.emit();
  }
}
