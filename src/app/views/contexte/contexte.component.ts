import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';


/* Composant permettant de gérer la page de contexte.
Il permet de rediriger l'utilisateur vers la page des règles. */

@Component({
  selector: 'app-contexte',
  templateUrl: './contexte.component.html',
  styleUrl: './contexte.component.css',
  imports: [ButtonModule, DividerModule]
})
export class ContexteComponent {
  constructor(private router:Router) {}
  continuer(){
    this.router.navigate(['./regles'])
  }
}
