import { Component, EventEmitter, Input, Output, OnInit, SimpleChanges, OnChanges, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { UserService } from '../../../shared/services/user-service';
import { navigation_data_solutions } from '../../../app.component';
import { Task } from '../../../shared/services/user-service';
import { CommonModule } from '@angular/common';
import { AnswerStorageService } from '../../../shared/services/answer-storage.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-navigation-card-solutions',
  standalone: true,
  imports: [DropdownModule, FormsModule, CommonModule],
  templateUrl: './navigation-card-solutions.component.html',
  styleUrls: ['./navigation-card-solutions.component.css'],
})
export class NavigationCardSolutionsComponent implements OnInit, OnChanges, OnDestroy {
  @Input() card_number!: number; 
  @Output() answer = new EventEmitter<string>();
  previousCardNumber: number | null = null;
  previousDropdownValues: string[] = [];
  Navdata = navigation_data_solutions;
  options: { label: string, value: string }[] = [];
  dropdowns: { selectedOption: string }[] = [{ selectedOption: '' }];
  timeExpiredDialog = false; // Booléen pour afficher ou non la boîte de dialogue lorsque le temps est écoulé
  
  
    remainingTime: number = 0; // Temps restant
    private timerSubscription: Subscription | undefined = undefined;

  constructor(private router: Router, public service: UserService, private answerStorage: AnswerStorageService) {}

  ngOnInit(): void {
    // Charger les utilisateurs dans les options du dropdown
    this.options = this.service.getUsers().map(user => ({
      label: user.name,   // User's name as label
      value: user.email   // User's email as value
    }));
    this.timerSubscription = this.answerStorage.getRemainingTime().subscribe(time => {
      this.remainingTime = time;
      if (this.remainingTime === 0) {
        this.showTimeExpiredDialog();
      }
    });
    // S'abonner au temps restant depuis le service
    this.timerSubscription = this.answerStorage.getRemainingTime().subscribe(time => {
      this.remainingTime = time;
    });


    // Démarrer le compte à rebours
    this.answerStorage.startTimer();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['card_number']) {
      const change = changes['card_number'];
      this.previousCardNumber = change.previousValue; 
      if (this.previousCardNumber !== change.currentValue) {
        // Appel pour mettre à jour les dropdowns en fonction de la nouvelle carte
        this.updateDropdownsForNewCard();
      }
    }
  }
  ngOnDestroy(): void {
    // Éviter les fuites de mémoire
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
    console.log('NavigationCardComponent détruit');
  }

  updateDropdownsForNewCard(): void {
    const cardId = this.Navdata['data'][this.card_number - 1]?.id;

    if (cardId !== undefined) {
      const assignedUsers = this.service.getUsersWithTask(cardId);
      
      if (assignedUsers.length > 0) {
        // Si des utilisateurs ont la tâche, remplir les dropdowns avec leurs emails
        this.dropdowns = assignedUsers.map(user => ({ selectedOption: user.email }));
      } else {
        // Sinon, réinitialiser les dropdowns
        this.dropdowns = [{ selectedOption: '' }];
      }
    } else {
      // Réinitialiser les dropdowns si l'ID de la carte est introuvable
      this.dropdowns = [{ selectedOption: '' }];
    }
  }

  onDropdownChange(index: number): void {
    const currentSelectedEmail = this.dropdowns[index]?.selectedOption;
    const previousSelectedEmail = this.previousDropdownValues[index];
    this.previousDropdownValues[index] = currentSelectedEmail;
    // Si la sélection actuelle est vide et que l'ancienne sélection n'est pas vide, on retire la tâche
    if (!currentSelectedEmail && previousSelectedEmail) {
      this.removeTaskFromUser(index, previousSelectedEmail); // Retirer la tâche de l'utilisateur précédent
    }
  
    // Si l'utilisateur actuel est sélectionné, on lui assigne la tâche
    if (currentSelectedEmail) {
      this.assignTaskToUser(index);
    }
  }

  assignTaskToUser(index: number): void {
    const selectedEmail = this.dropdowns[index]?.selectedOption;
  
    if (!selectedEmail) {
      return;
    }
  
    const user = this.service.getUserByEmail(selectedEmail);
    const cardId = this.Navdata['data'][this.card_number - 1]?.id;
  
    if (user && cardId !== undefined) {
      if (!user.hasTask(cardId)) { 
        // Si l'utilisateur n'a pas encore la tâche, on l'ajoute.
        user.addTask(new Task(cardId));
      } else {
      }
    } else {
    }
  }
  showTimeExpiredDialog(): void {
    /*
    Fonction activée lorsque le temps est écoulé.
    Affiche la boîte de dialogue de temps écoulé.
    */
    this.timeExpiredDialog = true;
  }

  addDropdown(): void {
    this.dropdowns.push({ selectedOption: '' });
  }

  removeDropdown(index: number): void {
    const previousSelectedEmail = this.previousDropdownValues[index];
    this.removeTaskFromUser(index,previousSelectedEmail);
    this.dropdowns.splice(index, 1);
  }
  removeTaskFromUser(index: number, email: string): void {
    const user = this.service.getUserByEmail(email);
  
    // Vérifier si l'utilisateur existe
    if (!user) {
      return;
    }
  
    // Récupérer l'ID de la carte actuelle
    const cardId = this.Navdata['data'][this.card_number - 1]?.id;
    if (cardId === undefined) {
      return;
    }
  
    // Supprimer la tâche si l'utilisateur l'a
    if (user.hasTask(cardId)) {
      user.removeTaskById(cardId);
    } else {
    }
  }

  getFilteredOptions(index: number): { label: string, value: string }[] {
    // Récupère toutes les options possibles
    let availableOptions = [...this.options];
  
    // Récupère toutes les valeurs sélectionnées sauf pour le dropdown actuel
    const selectedValues = this.dropdowns
      .filter((_, i) => i !== index)
      .map(d => d.selectedOption)
      .filter(val => val !== ''); // Évite de filtrer les valeurs vides
  
    // Retourne uniquement les options qui ne sont pas encore sélectionnées
    return availableOptions.filter(option => !selectedValues.includes(option.value));
  }

  updateQueryParams(): void {
    // Update query parameters with card_answer
    this.router.navigate([], {
      queryParamsHandling: 'merge',
      skipLocationChange: false,
    });
  }

  handleMissingImage(event: any): void {
    event.target.style.display = 'none'; // Cache l'image si elle n'existe pas (pas utilisé car avec l'implémentation de error, il trouve l'image si elle existe mais ne l'affiche pas ¯\_(ツ)_/¯ )
  }

  hasRemainingOptions(): boolean {
    const selectedOptions = this.dropdowns.map(dropdown => dropdown.selectedOption);
    return this.options.some(option => !selectedOptions.includes(option.value));
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
