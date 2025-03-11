import { Component } from '@angular/core';
import {Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-rules',
  imports: [ButtonModule, DividerModule],
  templateUrl: './rules.component.html',
  styleUrl: './rules.component.css'
})

/* Composant permettant de gérer la page des règles.
Il permet de rediriger l'utilisateur vers la page d'enregistrement ou vers le quiz. */

export class RulesComponent {

    constructor(private router:Router) {}
    continuer(){
      this.router.navigate(['./enregistrement_utilisateur']);
    }

    startQuiz(){
      
      this.router.navigate(['./cartes_inclusif']);
      console.log("Quiz started");
    }
}
