import { Injectable } from '@angular/core';
import { navigation_data } from './app.component';

@Injectable({
  providedIn: 'root'
})
export class AnswerStorageService {

  private answers: { [key: number]: boolean } = {}; // Store answers using card number as key

  constructor() {
  navigation_data.data.forEach((item, index) => {
    this.answers[index] = false;
  
  });
}
  // Save answer
  setAnswer(cardNumber: number, answer: boolean): void {
    this.answers[cardNumber] = answer;
  }

  // Retrieve answer
  getAnswer(cardNumber: number): boolean {
    return this.answers[cardNumber];
  }

  getAllAnswers(): { [key: number]: boolean } {
    return this.answers;
  }
}
