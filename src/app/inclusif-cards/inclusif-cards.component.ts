import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationButtonComponent } from "./navigation-button/navigation-button.component";
import { ThemeIndicatorComponent } from './theme-indicator/theme-indicator.component';
import { ActivatedRoute, Router } from '@angular/router';
import { navigation_data } from "../app.component";
import { NavigationCardComponent } from "./navigation-card/navigation-card.component";
import { Subscription } from 'rxjs';
import { AnswerStorageService } from '../answer-storage.service';

@Component({
  selector: 'app-inclusif-cards',
  standalone: true,
  imports: [CommonModule, NavigationButtonComponent, NavigationCardComponent],
  templateUrl: './inclusif-cards.component.html',
  styleUrls: ['./inclusif-cards.component.css'],
})
export class InclusifCardsComponent implements OnInit, OnDestroy {
  currentNumber: number = 0; // Numéro de la carte actuelle
  cat: string = ''; // Catégorie actuelle
  currentAnswer: boolean = false; // Réponse actuelle
  suivant = false; // Indicateur de navigation
  remainingTime: number = 2400; // Temps restant
  showCard: boolean = true; // Indicateur pour afficher la carte

  private routeSubscription: Subscription | undefined = undefined;
  private timerSubscription: Subscription | undefined = undefined;
  private currentNumberSubscription: Subscription | undefined = undefined;
  private catSubscription: Subscription | undefined = undefined;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private answerStorage: AnswerStorageService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // Récupérer les query params lors de l'initialisation du composant
    this.routeSubscription = this.route.queryParams.subscribe(params => {
      const id = +params['id']; // Récupérer 'id' depuis les query params

      if (id && id !== this.currentNumber && id >= 0 && id < navigation_data.data.length) {
        this.answerStorage.setCurrentNumber(id); // Mise à jour de currentNumber si le query param 'id' est valide
        this.answerStorage.setCat(navigation_data.data[id]?.categorie ?? ''); // Mettre à jour la catégorie
        this.currentNumber = id;
        this.cat = navigation_data.data[id]?.categorie ?? '';
        this.currentAnswer = this.answerStorage.getAnswer(id); // Mise à jour de la réponse associée à la carte
      }
    });

    // S'abonner au temps restant depuis le service
    this.timerSubscription = this.answerStorage.getRemainingTime().subscribe(time => {
      this.remainingTime = time;
    });

    // S'abonner au numéro actuel depuis le service
    this.currentNumberSubscription = this.answerStorage.getCurrentNumber().subscribe(number => {
      this.currentNumber = number;
    });

    // S'abonner à la catégorie depuis le service
    this.catSubscription = this.answerStorage.getCat().subscribe(cat => {
      this.cat = cat;
    });

    // Démarrer le compte à rebours
    this.answerStorage.startTimer();
  }

  ngOnDestroy(): void {
    // Éviter les fuites de mémoire
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
    if (this.currentNumberSubscription) {
      this.currentNumberSubscription.unsubscribe();
    }
    if (this.catSubscription) {
      this.catSubscription.unsubscribe();
    }
    // Arrêter le compte à rebours
    this.answerStorage.stopTimer();
  }

  onCardChange(newCardNumber: number): void {
    this.showCard = false;
    this.cdRef.detectChanges(); // Forcer la détection des changements
    setTimeout(() => {
      this.currentNumber = newCardNumber;
      this.currentAnswer = this.answerStorage.getAnswer(newCardNumber);
      this.showCard = true;
      this.cdRef.detectChanges(); // Forcer la détection des changements
    }, 0);
  }
}
