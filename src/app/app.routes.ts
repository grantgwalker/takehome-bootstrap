import { Routes } from '@angular/router';
import { AddFlashCardComponent } from './add-flash-card/add-flash-card.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  // Default to the flash card list route
  { path: '', redirectTo: '/flash-cards', pathMatch: 'full' },
  { path: 'flash-cards', component: HomeComponent },
  { path: 'add-flash-card', component: AddFlashCardComponent }
];
