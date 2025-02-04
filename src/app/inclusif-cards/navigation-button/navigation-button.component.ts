import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { navigation_data } from '../../app.component';
@Component({
  selector: 'app-navigation-button-solutions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navigation-button.component.html',
  styleUrls: ['./navigation-button.component.css']
})
export class NavigationButtonComponent {
  @Input() carte_suivante!: boolean;
  @Input() currentNumber: number = 0;
  @Input() cat!: string;
  @Output() cardChange = new EventEmitter<number>();
  @Output() catChange = new EventEmitter<string>();

  constructor(private router: Router) {}

  //Change de carte
  changecard() {
    if (this.carte_suivante && this.currentNumber < navigation_data.data.length-1) {
      this.currentNumber += 1; 
      if (this.currentNumber != navigation_data.data.length) {
      this.cat = navigation_data.data[this.currentNumber]?.categorie; }
      this.router.navigate(['cartes_inclusif', "carte"], {
        queryParams: { id: this.currentNumber } //Changement du numéro de carte
      });
      this.cardChange.emit(this.currentNumber);
      this.catChange.emit(this.cat);
      } 
      else if (!this.carte_suivante && this.currentNumber > 0) {
      this.currentNumber -= 1;
      this.cat = navigation_data.data[this.currentNumber]?.categorie; 
      this.router.navigate(['cartes_inclusif', "carte"], {
        queryParams: { id: this.currentNumber }
      });
    }
      else if (this.carte_suivante) {
        this.router.navigate(['rules_solutions']);
      }
      else if (!this.carte_suivante) {
        this.router.navigate(['user-registration']);
      }
      this.cardChange.emit(this.currentNumber);
      this.catChange.emit(this.cat);
    }



  }

