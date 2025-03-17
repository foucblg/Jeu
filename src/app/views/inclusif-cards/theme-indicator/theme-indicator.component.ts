import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges, inject } from '@angular/core';
import { AnswerStorageService } from '../../../answer-storage.service';

/* Composant permettant de gérer l'indicateur de progression des catégories.
Il permet d'afficher la progression de l'utilisateur pour chaque catégorie de manière dynamique. */
@Component({
  selector: 'app-theme-indicator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './theme-indicator.component.html',
  styleUrls: ['./theme-indicator.component.css']
})
export class ThemeIndicatorComponent implements OnChanges {
  @Input() id: number = 0; // Identifiant de la carte actuelle
  answerStorageService: AnswerStorageService = inject(AnswerStorageService); // Injection du service
  index_cat: number = 0; // Index de la catégorie actuelle
  percentage: number = 0; // Pourcentage de progression
  cat: string = this.answerStorageService.getCategorie(this.id); // Catégorie actuelle
  categories: string[] = this.answerStorageService.getCategories(); // Liste des catégories

  ngOnInit(): void {
    this.updateProgress(); // Met à jour la progression lors de l'initialisation du composant
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['id']) {
      this.updateProgress(); // Met à jour la progression lorsque la carte change
    }
  }

  updateProgress(): void {
    /* Fonction permettant de mettre à jour la barre de progression en fonction de la catégorie de la carte.
    Récupère la catégorie de la carte, puis récupère l'index de cette catégorie dans le tableau des catégories.
    Enfin, récupère le pourcentage de progression pour cette
    catégorie et l'affiche dans la barre de progression. */

    this.cat = this.answerStorageService.getCategorie(this.id);
    this.index_cat = this.categories.indexOf(this.cat);
    this.percentage = this.answerStorageService.getPercentage(this.id);
  }
}