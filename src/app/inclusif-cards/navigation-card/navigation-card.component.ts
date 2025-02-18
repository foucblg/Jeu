import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnswerStorageService } from '../../answer-storage.service';
import { ChangeDetectorRef } from '@angular/core';
import { navigation_data } from '../../app.component'; 
import {RadioButtonModule} from 'primeng/radiobutton'
import { FormsModule } from '@angular/forms';
import { ImageModule } from 'primeng/image';
@Component({
  selector: 'app-navigation-card-solutions',
  standalone: true,
  imports: [RadioButtonModule,FormsModule,CommonModule, ImageModule],
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


  constructor(private router: Router, private answerStorage: AnswerStorageService, private cdRef: ChangeDetectorRef) {}

 
  
  onAnswer(answer: boolean) {
    this.card_answer = answer;
    this.answerStorage.setAnswer(this.card_number, answer); // Store answer in service

    this.answerChange.emit(this.card_answer);
    console.log(this.answerStorage.getAllAnswers());

  }

  getSavedAnswer() {
    return this.answerStorage.getAnswer(this.card_number);
  }

  onImageError(imageUrl: string) {
    console.error(`Image not found: ${imageUrl}`);
  }
}
