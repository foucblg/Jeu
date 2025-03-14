import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ImageModule } from 'primeng/image';
import { DividerModule } from 'primeng/divider';

/* Composant permettant de gérer la page d'accueil.
Il permet de rediriger l'utilisateur vers la page de contexte. */

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css',
  imports: [ButtonModule, ImageModule, DividerModule]
})
export class HomepageComponent {
  constructor(private router:Router) {}

  commencer(){
    this.router.navigate(['./contexte'])
  }

}
