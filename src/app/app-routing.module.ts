import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LearningPageComponent } from './pages/learning-page/learning-page.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'learn', component: LearningPageComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
