import { Injectable } from '@angular/core';
import { navigation_data } from './app.component';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnswerStorageService {

  private answers: { [key: number]: boolean } = {}; // Store answers using card number as key
  private remainingTimeSubject: BehaviorSubject<number> = new BehaviorSubject<number>(2400); // Initial remaining time
  private currentNumberSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0); // Initial current number
  private catSubject: BehaviorSubject<string> = new BehaviorSubject<string>(navigation_data.data[0]?.categorie ?? ''); // Initial category
  private continue: boolean = true;

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

  getRemainingTime() {
    return this.remainingTimeSubject.asObservable();
  }

  // Set remaining time
  setRemainingTime(time: number) {
    this.remainingTimeSubject.next(time);
  }

  // Get current number as an observable
  getCurrentNumber() {
    return this.currentNumberSubject.asObservable();
  }

  // Set current number
  setCurrentNumber(number: number) {
    this.currentNumberSubject.next(number);
  }

  // Get category as an observable
  getCat() {
    return this.catSubject.asObservable();
  }

  // Set category
  setCat(cat: string) {
    this.catSubject.next(cat);
  }

  // Start countdown timer
  startTimer() {
    this.continue = true;
    const interval = setInterval(() => {
      let currentTime = this.remainingTimeSubject.value;
      if (currentTime > 0 && this.continue) {
        this.setRemainingTime(currentTime - 1);
      } else {
        clearInterval(interval);
        // Handle timer end (e.g., move to the next card or show a message)
      }
    }, 1000);
  }

  stopTimer() {
    this.continue = false;
    this.setRemainingTime(2400);
  }
}




