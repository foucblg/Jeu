import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { UserService } from '../../../shared/user-service';
import { navigation_data_solutions } from '../../../app.component';
//import { navigation_data } from '../../../app.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navigation-card-solutions',
  standalone: true,
  imports: [DropdownModule, FormsModule,CommonModule],
  templateUrl: './navigation-card-solutions.component.html',
  styleUrls: ['./navigation-card-solutions.component.css'],
})
export class NavigationCardSolutionsComponent implements OnInit {
  @Input() card_number!: number;
  @Output() answer = new EventEmitter<string>();
  
  Navdata = navigation_data_solutions;

  options: { label: string, value: string }[] = [];
  dropdowns: { selectedOption: string }[] = [{ selectedOption: '' }];
  

  constructor(private router: Router, public service: UserService) {}

  ngOnInit(): void {
    
    this.options = this.service.getUsers().map(user => ({
      label: user.name,   // User's name as label
      value: user.email   // User's email as value
    }));
    
    
  }

  addDropdown(): void {
    this.dropdowns.push({ selectedOption: '' });
  }

  removeDropdown(index: number): void {
    this.dropdowns.splice(index, 1);
  }

  onAnswer(answer: string, index: number): void {
    this.updateQueryParams(); // Update query params with the answer
  }

  getFilteredOptions(index: number) {
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
  handleMissingImage(event: any) {
    event.target.style.display = 'none'; // Cache l'image si elle n'existe pas (pas utilisé car avec l'implémentation de error, il trouve l'image si elle existe mais ne l'affiche pas ¯\_(ツ)_/¯ )
  }
}