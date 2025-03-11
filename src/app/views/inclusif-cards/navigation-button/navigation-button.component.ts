import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { navigation_data } from '../../../app.component';
import { AnswerStorageService } from '../../../answer-storage.service';
import { ChangeDetectorRef } from '@angular/core';
import { ButtonModule } from 'primeng/button';

// Composant permettant de gérer les boutons de navigation entre les cartes inclusives.
@Component({
  selector: 'app-navigation-button',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './navigation-button.component.html',
  styleUrls: ['./navigation-button.component.css']
})
export class NavigationButtonComponent {
  @Input() carte_suivante!: boolean;
  @Input() currentNumber: number = 0;
  @Input() cat!: string;
  @Input() currentAnswer!: boolean;

  @Output() cardChange = new EventEmitter<number>();
  @Output() catChange = new EventEmitter<string>();
  @Output() answerChange = new EventEmitter<boolean>();

  constructor(private router: Router, public answerStorage: AnswerStorageService, private cdRef: ChangeDetectorRef) {
    this.answerStorage.getCurrentNumber().subscribe(number => {
      this.currentNumber = number;
    });
    this.answerStorage.getCat().subscribe(cat => {
      this.cat = cat;
    });
  }


 
  changecard()
   /*
  Fonction permettant de passer d'une carte diagnostic à une autre. Elle est reliée au bouton dans le html.
  Met à jour la variable currentNumber, et l'incrémente ou la décrémente, et va mettre à jour la carte affichée. L'url est également
  mise à jour pour refléter la nouvelle carte affichée.
  Dans les cas limites (premiere ou derniere carte), redirige vers les pages correspondantes (régles pour solutions et analyse)
  */ {
    if (this.carte_suivante && this.currentNumber < navigation_data.data.length - 1) {
      this.currentNumber += 1;
    } else if (!this.carte_suivante && this.currentNumber > 0) {
      this.currentNumber -= 1;
    } else if (this.carte_suivante) {
      this.router.navigate(['regles_solutions']);
      return;
    } else {
      this.router.navigate(['regles_analyse']);
      return;
    }

  //Mise à jour des valeurs, envoyé vers le composant parent "inclusif cards".
    this.cardChange.emit(this.currentNumber);
    this.catChange.emit(this.cat);
    this.answerChange.emit(this.currentAnswer);

    this.answerStorage.setCurrentNumber(this.currentNumber);
    this.answerStorage.setCat(this.cat);

    //Navigation à la carte suivante lorsque la variable currentNumber est modifiée.
    this.router.navigate(['cartes_inclusif', 'carte'], {
      queryParams: { id: this.currentNumber }
    });
  }
}

