import { Component } from '@angular/core';
import {Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ActionBarComponent } from '../../shared/action-bar/action-bar.component';
@Component({
  selector: 'app-rules-solutions',
  imports: [ButtonModule],
  templateUrl: './rules-solutions.component.html',
  styleUrl: './rules-solutions.component.css'
})
export class RulesSolutionsComponent {
  constructor(private router:Router) {}
    continuer(){
      this.router.navigate(['./solution'], {
        queryParams: { numero: 1},
        queryParamsHandling: 'merge', // Merge avec les paramètres existants
        skipLocationChange: false // Mettre à jour l'URL dans la barre d'adresse
      })
    }
}
