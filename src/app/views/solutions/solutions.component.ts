import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NavigationButtonSolutionsComponent } from "./navigation-button-solutions/navigation-button-solutions.component";
import { ThemeIndicatorComponent } from '../inclusif-cards/theme-indicator/theme-indicator.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AnswerStorageService } from '../../answer-storage.service';
import { navigation_data_solutions } from "../../app.component";
import { navigation_data } from '../../app.component';
import { NavigationCardSolutionsComponent } from "./navigation-card-solutions/navigation-card-solutions.component";
import { Subscription } from 'rxjs';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-solutions',
  standalone: true,
  imports: [NavigationButtonSolutionsComponent, ThemeIndicatorComponent, NavigationCardSolutionsComponent, DividerModule],
  templateUrl: './solutions.component.html',
  styleUrl: './solutions.component.css'
})
export class SolutionsComponent implements OnInit, OnDestroy {
  constructor(private router:Router,private route: ActivatedRoute,public awnser_service:AnswerStorageService) {}
    currentNumber = 0;
    @Input() theme_currentNumber=0;
      cat = navigation_data_solutions.data[0]?.categorie;
      suivant = false;
      applyFilters(): void {
        this.router.navigate(['/solutions'], { queryParams: { numero: '0', awnsered: 'false' } });
      }
  private routeSubscription: Subscription | undefined = undefined;
  ngOnInit(): void {
      // Récupérer les query params lors de l'initialisation du composant
      const answers: { [key: number]: boolean } = this.awnser_service.getAllAnswers();
      const result2 = Object.keys(answers).filter(key => !answers[+key]);
      // Liste pour stocker les IDs correspondants dans navigation_data_solutions
  let matchingIds: number[] = [];

  // Trouver les noms associés aux IDs trouvés dans navigation_data
  const correspondingNames = result2.map(id => navigation_data.data[+id]?.nom).filter(nom => nom !== undefined);

  // Parcourir navigation_data_solutions pour trouver les IDs qui correspondent aux sous_catégories
  matchingIds = navigation_data_solutions.data
    .filter(item => correspondingNames.includes(item.sous_categorie))
    .map(item => item.id);
  if (matchingIds[0]){
  this.currentNumber=matchingIds[0];}
  else{
    this.router.navigate(['regles_solutions'])
  }
      this.routeSubscription = this.route.queryParams.subscribe(params => {
        const id = +params['numero']; // Récupérer 'id' depuis les query params
        if (id && id !== this.currentNumber && id >= 0 && id < navigation_data_solutions.data.length) {
          this.currentNumber = id; // Mise à jour de currentNumber si le query param 'id' est valide
          this.cat = navigation_data_solutions.data[this.currentNumber]?.categorie; // Mettre à jour la catégorie
        }
        
          this.router.navigate([], {
            queryParams: { numero: ''+this.currentNumber},
            queryParamsHandling: 'merge', // Merge avec les paramètres existants
            skipLocationChange: false // Mettre à jour l'URL dans la barre d'adresse
          });
      });
      
      
    }
    ngOnDestroy(): void {
      // Eviter les memory leaks
      if (this.routeSubscription) {
        this.routeSubscription.unsubscribe();
      }
    }
}

