import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
    title = input('Flash-Focus');
    addingFlashCard = false;
    takingTest = false;

    addFlashCard() {
        this.addingFlashCard = false;
        console.log(this.addingFlashCard);
    }

    takeTest() {
        this.takingTest = true;
    }
}
