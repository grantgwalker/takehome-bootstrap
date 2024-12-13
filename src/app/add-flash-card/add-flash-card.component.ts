import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-add-flash-card',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './add-flash-card.component.html',
  styleUrl: './add-flash-card.component.scss'
})
export class AddFlashCardComponent {

}
