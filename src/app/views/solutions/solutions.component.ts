import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationButtonSolutionsComponent } from "./navigation-button-solutions/navigation-button-solutions.component";
import { ThemeIndicatorComponent } from '../inclusif-cards/theme-indicator/theme-indicator.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Injectable } from "@angular/core";
import { navigation_data_solutions } from "../app.component";
import { NavigationCardSolutionsComponent } from "./navigation-card-solutions/navigation-card-solutions.component";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-solutions',
  standalone: true,
  imports: [NavigationButtonSolutionsComponent, ThemeIndicatorComponent, NavigationCardSolutionsComponent],
  templateUrl: './solutions.component.html',
  styleUrl: './solutions.component.css'
})
export class SolutionsComponent implements OnInit, OnDestroy {
  constructor(private router:Router,private route: ActivatedRoute) {}
    currentNumber = 0;
      cat = navigation_data_solutions.data[0]?.categorie;
      suivant = false;
      applyFilters(): void {
        this.router.navigate(['/solutions'], { queryParams: { numero: '0', awnsered: 'false' } });
      }
  private routeSubscription: Subscription | undefined = undefined;
  ngOnInit(): void {
      // Récupérer les query params lors de l'initialisation du composant
  
  
      this.routeSubscription = this.route.queryParams.subscribe(params => {
        const id = +params['numero']; // Récupérer 'id' depuis les query params
        console.log("coucou"+id);
        if (id && id !== this.currentNumber && id >= 0 && id < navigation_data_solutions.data.length) {
          this.currentNumber = id; // Mise à jour de currentNumber si le query param 'id' est valide
          this.cat = navigation_data_solutions.data[this.currentNumber]?.categorie; // Mettre à jour la catégorie
        }
      });
      
    }
    ngOnDestroy(): void {
      // Eviter les memory leaks
      if (this.routeSubscription) {
        this.routeSubscription.unsubscribe();
      }
    }
}

