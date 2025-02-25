import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { UserService } from '../../user-service';
import { navigation_data_solutions } from '../../app.component';
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
  card_answer = "";
  Navdata = navigation_data_solutions;

  options: { label: string, value: string }[] = [];
  dropdowns: { selectedOption: string }[] = [{ selectedOption: '' }];

  constructor(private router: Router, public service: UserService) {console.log("bonjour");}

  ngOnInit(): void {
    // Convert users data to options in the required format
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
    this.card_answer = answer; // Update answer
    this.answer.emit(this.card_answer); // Emit the answer to the parent component
    this.updateQueryParams(); // Update query params with the answer
  }

  updateQueryParams(): void {
    // Update query parameters with card_answer
    this.router.navigate([], {
      queryParams: { answered: this.card_answer },
      queryParamsHandling: 'merge',
      skipLocationChange: false,
      
    });
  }
  handleMissingImage(event: any) {
    event.target.style.display = 'none'; // Cache l'image si elle n'existe pas
    console.log("on a pas d'image pour la "+this.card_number);
    console.log("'/images/solution_' + card.id + '.png'");
  }
}