import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BeginnerComponent } from './pages/beginner/beginner.component';
import { IntermediateComponent } from './pages/intermediate/intermediate.component';
import { AdvancedComponent } from './pages/advanced/advanced.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'beginner', component: BeginnerComponent },
  { path: 'intermediate', component: IntermediateComponent },
  { path: 'advanced', component: AdvancedComponent },
  { path: '**', redirectTo: '' }
];
