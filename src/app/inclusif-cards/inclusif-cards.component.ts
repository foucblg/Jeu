import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavigationButtonComponent } from "./navigation-button/navigation-button.component";
import { ThemeIndicatorComponent } from './theme-indicator/theme-indicator.component';
import { ActivatedRoute, Router } from '@angular/router';
import { navigation_data } from "../app.component";
import { NavigationCardComponent } from "./navigation-card/navigation-card.component";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-inclusif-cards',
  standalone: true,
  imports: [NavigationButtonComponent, ThemeIndicatorComponent, NavigationCardComponent],
  templateUrl: './inclusif-cards.component.html',
  styleUrls: ['./inclusif-cards.component.css'],
})
export class InclusifCardsComponent implements OnInit, OnDestroy {
  currentNumber: number = 0; // Numéro de la carte actuelle
  cat = navigation_data.data[0]?.categorie; // Catégorie dans laquelle se trouve la carte
  suivant = false;
  private routeSubscription: Subscription | undefined = undefined;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Récupérer les query params lors de l'initialisation du composant
    this.routeSubscription = this.route.queryParams.subscribe(params => {
      const id = +params['id']; // Récupérer 'id' depuis les query params

      if (id && id !== this.currentNumber && id >= 0 && id < navigation_data.data.length) {
        this.currentNumber = id; // Mise à jour de currentNumber si le query param 'id' est valide
        this.cat = navigation_data.data[this.currentNumber]?.categorie; // Mettre à jour la catégorie
      }
    });
  }

  ngOnDestroy(): void {
    // Eviter les memory leaks
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

  // Cette méthode peut être utilisée pour changer de carte via les query params
  onCardChange(newCardNumber: number): void {
    if (newCardNumber !== this.currentNumber) {
      this.currentNumber = newCardNumber;
      this.router.navigate([], {
        queryParams: { id: this.currentNumber }, // Mettre à jour l'URL avec le nouveau query param
        queryParamsHandling: 'merge' // Garder les autres query params intacts
      });
      this.cat = navigation_data.data[this.currentNumber]?.categorie; // Mettre à jour la catégorie
    }
  }
}
