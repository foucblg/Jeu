import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AnswerStorageService } from '../../answer-storage.service';
import { ChangeDetectorRef } from '@angular/core';
import { navigation_data } from '../../app.component'; 
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormsModule } from '@angular/forms';
import { ImageModule } from 'primeng/image';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navigation-card-solutions',
  standalone: true,
  imports: [RadioButtonModule, FormsModule, CommonModule, ImageModule, ButtonModule, DialogModule],
  templateUrl: './navigation-card.component.html',
  styleUrl: './navigation-card.component.css'
})
export class NavigationCardComponent implements OnInit, OnDestroy {
  @Input() card_number!: number; // Numéro de la carte
  @Input() card_answer!: boolean; // Réponse de la carte
  @Output() answerChange = new EventEmitter<boolean>();

  allAnswers: { [key: number]: boolean } = {}; // Contient la réponse de chaque carte

  Navdata = navigation_data; //Récupération des données des cartes
  ngModel = 'Non'; // Valeur par défaut pour le bouton radio

  displayDialog = false;
  remainingTime: number = 0; // Temps restant
  private timerSubscription: Subscription | undefined = undefined;

  constructor(private router: Router, private answerStorage: AnswerStorageService, private cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    // Définir la valeur initiale de ngModel en fonction de card_answer
    this.ngModel = this.card_answer ? 'Oui' : 'Non';

    // S'abonner au temps restant depuis le service
    this.timerSubscription = this.answerStorage.getRemainingTime().subscribe(time => {
      this.remainingTime = time;
    });

    console.log('NavigationCardComponent créé');
  }

  ngOnDestroy(): void {
    // Éviter les fuites de mémoire
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
    console.log('NavigationCardComponent détruit');
  }

  onAnswer(answer: boolean): void {
    this.card_answer = answer;
    this.answerStorage.setAnswer(this.card_number, answer);
    this.answerChange.emit(this.card_answer);
    console.log(this.answerStorage.getAllAnswers());

    // Mettre à jour les valeurs de ngModel en fonction de la réponse sélectionnée
    this.ngModel = answer ? 'Oui' : 'Non';
  }

  showDialog(): void {
    this.displayDialog = true;
  }

  hideDialog(): void {
    this.displayDialog = false;
  }

  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  }
}
