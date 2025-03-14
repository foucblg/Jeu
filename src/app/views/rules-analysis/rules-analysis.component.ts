import { Component } from '@angular/core';
import {Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';

/* Composant permettant de gérer la page des règles pour les cartes diagnostic
Il permet de rediriger l'utilisateur vers la page des cartes diagnostic. */
@Component({
  selector: 'app-rules-analysis',
  imports: [ButtonModule, DividerModule],
  templateUrl: './rules-analysis.component.html',
  styleUrl: './rules-analysis.component.css'
})
export class RulesAnalysisComponent {
  constructor(private router:Router) {}
  continuer(){
    this.router.navigate(['./cartes_inclusif'])
  }
}
