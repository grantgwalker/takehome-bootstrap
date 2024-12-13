import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FlashCardListComponent } from "../flash-card-list/flash-card-list.component";
import { HeaderComponent } from "../header/header.component";
import { HomeComponent } from "../home/home.component";

@Component({
  selector: 'app-take-test',
  standalone: true,
  imports: [RouterLink, HomeComponent, HeaderComponent, FlashCardListComponent],
  templateUrl: './take-test.component.html',
  styleUrl: './take-test.component.scss'
})
export class TakeTestComponent {
  title = input('Flash-Focus');
  testMode = true;

}
