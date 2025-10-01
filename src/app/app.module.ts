import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// PrimeNG Modules
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ProgressBarModule } from 'primeng/progressbar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TooltipModule } from 'primeng/tooltip';

// Angular Material Modules
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// Angular CDK
import { ClipboardModule } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';

// Components
import { HomeComponent } from './pages/home/home.component';
import { LearningPageComponent } from './pages/learning-page/learning-page.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { BeginnerSectionComponent } from './components/beginner-section/beginner-section.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LearningPageComponent,
    HeaderComponent,
    FooterComponent,
    NavigationComponent,
    BeginnerSectionComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    AppRoutingModule,
    CommonModule,
    ButtonModule,
    CardModule,
    ProgressBarModule,
    ProgressSpinnerModule,
    TooltipModule,
    ClipboardModule,
    MatCardModule,
    MatExpansionModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
