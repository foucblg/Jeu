import { Component } from '@angular/core';
import { NavigationButtonSolutionsComponent } from "./navigation-button-solutions/navigation-button-solutions.component";
import { ThemeIndicatorComponent } from '../inclusif-cards/theme-indicator/theme-indicator.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Injectable } from "@angular/core";
import { navigation_data_solutions } from "../app.component";
import { NavigationCardSolutionsComponent } from "./navigation-card-solutions/navigation-card-solutions.component";

@Component({
  selector: 'app-solutions',
  standalone: true,
  imports: [NavigationButtonSolutionsComponent, ThemeIndicatorComponent, NavigationCardSolutionsComponent],
  templateUrl: './solutions.component.html',
  styleUrl: './solutions.component.css'
})
export class SolutionsComponent {
  constructor(private router:Router) {}
    currentNumber = 0;
      cat = navigation_data_solutions.data[0]?.categorie;
      suivant = false;
      applyFilters(): void {
        this.router.navigate(['/solutions'], { queryParams: { numero: '0', awnsered: 'false' } });
      }
}

