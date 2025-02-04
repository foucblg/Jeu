import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnswerStorageService } from '../../answer-storage.service';
import { ChangeDetectorRef } from '@angular/core';
import { navigation_data } from '../../app.component'; 
@Component({
  selector: 'app-navigation-card-solutions',
  standalone: true,
  imports: [],
  templateUrl: './navigation-card.component.html',
  styleUrl: './navigation-card.component.css'
})
export class NavigationCardComponent implements OnInit {
  @Input() card_number!: number;
  @Input() card_answer!: boolean;
  @Output() answerChange = new EventEmitter<boolean>();
  
  allAnswers: { [key: number]: boolean } = {};
  Navdata=navigation_data;

  constructor(private router: Router, private answerStorage: AnswerStorageService, private cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {  //debuggage
    this.allAnswers = this.answerStorage.getAllAnswers();
  }
  
  onAnswer(answer: boolean) {
    this.card_answer = answer;
    this.answerStorage.setAnswer(this.card_number, answer); // Store answer in service

    this.answerChange.emit(this.card_answer);

    // Debugging
    console.log(this.allAnswers);

  }

  getSavedAnswer() {
    return this.answerStorage.getAnswer(this.card_number);
  }
}
