import { Component, OnInit } from '@angular/core';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'learning-guru-app';

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    // ThemeService constructor will load and apply the saved theme
  }
}
