import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  // Default to the flash card list route
  { path: '', redirectTo: '/flash-cards', pathMatch: 'full' },
  { path: 'flash-cards', component: HomeComponent }
];
