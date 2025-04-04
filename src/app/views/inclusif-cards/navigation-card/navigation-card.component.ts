import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, OnInit, OnDestroy, SimpleChanges} from '@angular/core';
import { Router } from '@angular/router';
import { AnswerStorageService } from '../../../shared/services/answer-storage.service';
import { ChangeDetectorRef } from '@angular/core';
import { navigation_data } from '../../../app.component';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormsModule } from '@angular/forms';
import { ImageModule } from 'primeng/image';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { Subscription } from 'rxjs';

/* Composant permettant de gérer les cartes inclusives.
Il permet de sélectionner une réponse pour chaque carte, et de naviguer entre les cartes.
Il gère également l'affichage des images et du texte pour les questions */
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
  ngModel = 'Rien'; // Valeur par défaut pour les bouton radio

  displayDialog = false; // Booléen pour afficher ou non la boîte de dialogue d'information "i"
  timeExpiredDialog = false; // Booléen pour afficher ou non la boîte de dialogue lorsque le temps est écoulé


  remainingTime: number = 0; // Temps restant
  private timerSubscription: Subscription | undefined = undefined;

  constructor(private router: Router, private answerStorage: AnswerStorageService, private cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {

    // S'abonner au temps restant depuis le service
    this.timerSubscription = this.answerStorage.getRemainingTime().subscribe(time => {
      this.remainingTime = time;
      if (this.remainingTime === 0) {
        this.showTimeExpiredDialog();
      }
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
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['card_number']) {
      const change = changes['card_number'];
      const previousCardNumber = change.previousValue;
      if (previousCardNumber !== change.currentValue) {
        // Appel pour mettre à jour les dropdowns en fonction de la nouvelle carte
        this.onCardChange(this.card_number);
      }
    }
    
  }

  onCardChange(newCardNumber: number): void {
    //Met à jour la réponse dans les radiobuttons lorsqu'il y a un changement de carte
    this.card_number = newCardNumber;
    if (this.answerStorage.getEtat(this.card_number)=='est_repondu') {
    this.ngModel = this.answerStorage.getAnswer(newCardNumber) ? 'Oui' : 'Non';
    }
    else {
      this.ngModel = 'Rien'
    }
  }
  

  onAnswer(answer: boolean): void {
    /*
    Fonction activée lorsqu'un radiobutton est sélectionné ("Oui" ou "Non").
    Met à jour la réponse de la carte dans le service de stockage des réponses, et 
    émet un événement pour mettre à jour la réponse dans le parent.
    */

    this.card_answer = answer;
    this.answerStorage.setAnswer(this.card_number, answer);
    this.answerChange.emit(this.card_answer);
    console.log(this.answerStorage.getAllAnswers());

    // Mettre à jour les valeurs de ngModel en fonction de la réponse sélectionnée
    this.ngModel = answer ? 'Oui' : 'Non';

    if (this.answerStorage.getEtat(this.card_number) == 'non_visite') {
      this.answerStorage.setRepondu(this.card_number); // Marque la carte comme répondue
  }
}

  showDialog(): void {
    /*
    Fonction activée lorsqu'on clique sur le bouton d'information "i".
    Affiche la boîte de dialogue d'information.
    */
    this.displayDialog = true;
  }

  hideDialog(): void {
    /* Fonction activée lorsqu'on clique sur le bouton "Fermer" de la boîte de dialogue d'information.
    Cache la boîte de dialogue d'information.
    */
    this.displayDialog = false;
  }

  showTimeExpiredDialog(): void {
    /*
    Fonction activée lorsque le temps est écoulé.
    Affiche la boîte de dialogue de temps écoulé.
    */
    this.timeExpiredDialog = true;
  }

  hideTimeExpiredDialog(): void {
    /* Fonction activée lorsqu'on clique sur le bouton "Fermer" de la boîte de dialogue de temps écoulé.
    Cache la boîte de dialogue de temps écoulé.
    */
    this.timeExpiredDialog = false;
  }

  formatTime(seconds: number): string {
    /*
    Fonction pour formater le temps restant en minutes et secondes.
    */
    const isNegative = seconds < 0;
    seconds = Math.abs(seconds);
    
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    
    return `${isNegative ? '-' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  }
}
