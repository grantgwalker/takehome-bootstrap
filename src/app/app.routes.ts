import { Routes } from '@angular/router';
import { FlashCardListComponent } from './flash-card-list/flash-card-list.component';

export const routes: Routes = [
  { path: '', redirectTo: '/flash-cards', pathMatch: 'full' },
  { path: 'flash-cards', component: FlashCardListComponent }
];
