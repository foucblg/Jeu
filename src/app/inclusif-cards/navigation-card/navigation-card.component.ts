import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnswerStorageService } from '../../answer-storage.service';
import { ChangeDetectorRef } from '@angular/core';
import { navigation_data } from '../../app.component'; 
import {RadioButtonModule} from 'primeng/radiobutton'
import { FormsModule } from '@angular/forms';
import { ImageModule } from 'primeng/image';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-navigation-card-solutions',
  standalone: true,
  imports: [RadioButtonModule,FormsModule,CommonModule, ImageModule,ButtonModule, DialogModule],
  templateUrl: './navigation-card.component.html',
  styleUrl: './navigation-card.component.css'
})
export class NavigationCardComponent {
  @Input() card_number!: number;
  @Input() card_answer!: boolean;
  @Output() answerChange = new EventEmitter<boolean>();
  
  allAnswers: { [key: number]: boolean } = {};
  Navdata=navigation_data;
  ngModel1 = 'Oui';
  ngModel2 = 'Non';
  displayDialog = false;


  constructor(private router: Router, private answerStorage: AnswerStorageService, private cdRef: ChangeDetectorRef) {}

 
  
  onAnswer(answer: boolean) { //Met a jour la réponse donnée par l'utilisateur à la carte diagnostic
    this.card_answer = answer;
    this.answerStorage.setAnswer(this.card_number, answer); 

    this.answerChange.emit(this.card_answer);
    console.log(this.answerStorage.getAllAnswers());

  }

  getSavedAnswer() {
    return this.answerStorage.getAnswer(this.card_number);
  }


  showDialog() { //Permet de montrer le popup d'information
    this.displayDialog = true;
  }

  hideDialog() {
    this.displayDialog = false;
  }
}
