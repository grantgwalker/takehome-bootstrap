import { Component } from '@angular/core';
import { FlashCardListComponent } from '../flash-card-list/flash-card-list.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ HeaderComponent, FlashCardListComponent ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
