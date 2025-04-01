import { Component } from '@angular/core';
import { HeaderComponent } from './shared/header/header.component';
import { RouterOutlet } from '@angular/router';
import * as donnees from './shared/assets/navigation_data.json';
import * as donnees2 from './shared/assets/anwsers_data.json';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [
    HeaderComponent,
    RouterOutlet,
]
})
export class AppComponent {
  title = 'Jeu';
  navigation_data = navigation_data;
  navigation_data_solutions = navigation_data_solutions;
}

export const navigation_data = donnees;
export const navigation_data_solutions = donnees2;