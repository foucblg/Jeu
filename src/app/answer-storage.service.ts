import { Injectable } from '@angular/core';
import { navigation_data } from './app.component';
import { BehaviorSubject } from 'rxjs';

/* Service englobant le component "inclusif-cards" permettant de stocker les réponses des cartes, le temps restant, le numéro actuel et la catégorie actuelle.
Il permet également de démarrer et d'arrêter le compte à rebours. */

@Injectable({
  providedIn: 'root'
})
export class AnswerStorageService {

  private answers: { [key: number]: boolean } = {}; // Stocke les réponses en utilisant le numéro de la carte comme clé
  private remainingTimeSubject: BehaviorSubject<number> = new BehaviorSubject<number>(2400); // Temps restant initial
  private currentNumberSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0); // Numéro actuel initial
  private catSubject: BehaviorSubject<string> = new BehaviorSubject<string>(navigation_data.data[0]?.categorie ?? ''); // Catégorie initiale
  private continue: boolean = true; // Indicateur pour continuer le compte à rebours
  private categories: string[] = []; // Liste des catégories

  constructor() {
    // Initialise les réponses pour chaque carte à false
    navigation_data.data.forEach((item, index) => {
      this.answers[index] = false;
    });
  }

  // Enregistre la réponse
  setAnswer(cardNumber: number, answer: boolean): void {
    this.answers[cardNumber] = answer;
  }

  setCategories(): string[] {
    /* Fonction permettant de récupérer toutes les catégories des cartes.
    Si la liste des catégories est vide, elle est remplie en parcourant toutes les cartes.
    Sinon, elle renvoie la liste des catégories. */
    if (this.categories.length > 0) {
      return this.categories;
    } else {
      navigation_data.data.forEach(item => {
        if (!this.categories.includes(item.categorie)) {
          this.categories.push(item.categorie);
        }
      });
      return this.categories;
    }
  }

  // Fonction permettant de récupérer la catégorie d'une carte en fonction de son numéro.
  getCategorie(cardNumber: number): string {
    return navigation_data.data[cardNumber].categorie;
  }

  // Récupère toutes les catégories
  getCategories(): string[] {
    return this.categories;
  }

  // Récupère la réponse d'une carte
  getAnswer(cardNumber: number): boolean {
    return this.answers[cardNumber];
  }

  getPercentage(cardNumber: number): number {
    /* Fonction permettant de calculer le pourcentage de progression pour une catégorie donnée.
    Parcours toutes les cartes pour compter le nombre de cartes de la même catégorie que la carte actuelle.
    Puis, calcule la position de la carte actuelle dans la liste des cartes de la même catégorie.
    Enfin, retourne le pourcentage de progression. */
    this.setCategories();
    let compteur = 0;
    let place = 0;
    navigation_data.data.forEach(item => {
      if (item.categorie === navigation_data.data[cardNumber].categorie) {
        console.log(item.numero);
        compteur++;
        if (item.numero === cardNumber) {
          place = compteur;
        }
      }
    });
    return (place / compteur) * 100;
  }

  // Récupère toutes les réponses
  getAllAnswers(): { [key: number]: boolean } {
    return this.answers;
  }

  // Récupère le temps restant en tant qu'observable
  getRemainingTime() {
    return this.remainingTimeSubject.asObservable();
  }

  // Définit le temps restant
  setRemainingTime(time: number) {
    this.remainingTimeSubject.next(time);
  }

  // Récupère le numéro actuel en tant qu'observable
  getCurrentNumber() {
    return this.currentNumberSubject.asObservable();
  }

  // Définit le numéro actuel
  setCurrentNumber(number: number) {
    this.currentNumberSubject.next(number);
  }

  // Récupère la catégorie en tant qu'observable
  getCat() {
    return this.catSubject.asObservable();
  }

  // Définit la catégorie
  setCat(cat: string) {
    this.catSubject.next(cat);
  }


  startTimer() {
    /* Fonction permettant de démarrer le compte à rebours.
    Utilise un intervalle pour décrémenter le temps restant toutes les secondes.
    Lorsque le temps restant atteint 0, l'intervalle est effacé et une action est effectuée. */
    this.continue = true;
    const interval = setInterval(() => {
      let currentTime = this.remainingTimeSubject.value;
      if (this.continue) {
        this.setRemainingTime(currentTime - 1);
      } else {
        clearInterval(interval);
      }
    }, 1000);
  }

  // Arrête le compte à rebours
  stopTimer() {
    this.continue = false;
    this.setRemainingTime(2400);
  }
}




