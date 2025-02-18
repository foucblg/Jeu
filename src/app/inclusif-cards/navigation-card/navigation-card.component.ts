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
import { Subscription } from 'rxjs';

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
  remainingTime: number = 0;
  private timerSubscription: Subscription | undefined = undefined;


  constructor(private router: Router, private answerStorage: AnswerStorageService, private cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    // Subscribe to the remaining time from the service
    this.timerSubscription = this.answerStorage.getRemainingTime().subscribe(time => {
      this.remainingTime = time;
    });
  }

  ngOnDestroy(): void {
    // Avoid memory leaks
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }
  
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

  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  }
}
