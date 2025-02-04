import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { navigation_data } from '../../app.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation-card-solutions',
  standalone: true,
  imports: [],
  templateUrl: './navigation-card.component.html',
  styleUrl: './navigation-card.component.css'
})

export class NavigationCardComponent {
  @Input() card_number!: number;
  @Output() answer = new EventEmitter<boolean>();
  card_answer = false;
  Navdata=navigation_data;

  
  constructor(private router: Router) {}
  onAnswer(answer: boolean) {
    this.card_answer = answer
  }

}
