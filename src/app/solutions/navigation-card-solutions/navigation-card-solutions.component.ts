import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { navigation_data_solutions } from '../../app.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-navigation-card-solutions',
  standalone: true,
  imports: [DropdownModule, FormsModule,CommonModule],
  templateUrl: './navigation-card-solutions.component.html',
  styleUrls: ['./navigation-card-solutions.component.css'],
})
export class NavigationCardSolutionsComponent {
  constructor(private router:Router) {}
  @Input() card_number!: number;
  @Output() answer = new EventEmitter<string>();
  card_answer = "";
  Navdata = navigation_data_solutions;

  options: { label: string, value: string }[] = [];
  dropdowns: { selectedOption: string }[] = [{ selectedOption: '' }];

  constructor(private router: Router, public service: UserService) {}

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
    this.router.navigate([], {
      queryParams: { awnsered: ''+this.card_answer },
      queryParamsHandling: 'merge', // Merge avec les paramètres existants
      skipLocationChange: false // Mettre à jour l'URL dans la barre d'adresse
    });
  }
}