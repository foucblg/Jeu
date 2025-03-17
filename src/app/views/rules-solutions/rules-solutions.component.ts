import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ActionBarComponent } from '../../shared/action-bar/action-bar.component';
import { navigation_data_solutions } from "../../app.component";
import { navigation_data } from '../../app.component';
import { AnswerStorageService } from '../../answer-storage.service';
import { DividerModule } from 'primeng/divider';
@Component({
  selector: 'app-rules-solutions',
  imports: [ButtonModule, DividerModule],
  templateUrl: './rules-solutions.component.html',
  styleUrl: './rules-solutions.component.css'
})

export class RulesSolutionsComponent implements OnInit {
  matchingIds: number[] = [];
  theme_currentNumber = 0;
  ngOnInit(): void {
        // Récupérer les query params lors de l'initialisation du composant
        const answers: { [key: number]: boolean } = this.awnser_service.getAllAnswers();
        const result2 = Object.keys(answers).filter(key => !answers[+key]);
        // Liste pour stocker les IDs correspondants dans navigation_data_solutions
  
    // Trouver les noms associés aux IDs trouvés dans navigation_data
    const correspondingNames = result2.map(id => navigation_data.data[+id]?.nom).filter(nom => nom !== undefined);
  
    // Parcourir navigation_data_solutions pour trouver les IDs qui correspondent aux sous_catégories
    this.matchingIds = navigation_data_solutions.data
      .filter(item => correspondingNames.includes(item.sous_categorie))
      .map(item => item.id);
    }
  constructor(private router:Router,public awnser_service:AnswerStorageService) {}
    continuer(){
      this.router.navigate(['./solution'], {
        queryParams: { numero: this.matchingIds[0]},
        queryParamsHandling: 'merge', // Merge avec les paramètres existants
        skipLocationChange: false // Mettre à jour l'URL dans la barre d'adresse
      })
      this.router.navigate(['./solution'], {
        queryParams: { numero: this.matchingIds[0]},
        queryParamsHandling: 'merge', // Merge avec les paramètres existants
        skipLocationChange: false // Mettre à jour l'URL dans la barre d'adresse
      })
    }
}
