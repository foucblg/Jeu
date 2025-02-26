import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { navigation_data_solutions } from '../../../app.component';
import {ActivatedRoute, Router } from '@angular/router';
import { AnswerStorageService } from '../../../answer-storage.service';
import { navigation_data } from '../../../app.component';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-navigation-button-solutions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navigation-button-solutions.component.html',
  styleUrls: ['./navigation-button-solutions.component.css']
})
export class NavigationButtonSolutionsComponent {
  constructor(private router:Router,private awnser_service:AnswerStorageService,private route: ActivatedRoute) {}
  private routeSubscription: Subscription | undefined = undefined;
  applyFilters(): void {
    this.router.navigate(['/solutions'], { queryParams: { numero: '0', awnsered: 'false' } });
  }
  indice_reponse=0;
  Navdata = navigation_data_solutions;
  @Input() avance!: boolean;
  @Input() currentNumber: number = 0
  @Input() cat!: string
  matchingIds: number[] = [];
  @Output() cardChange = new EventEmitter<number>();
  @Output() catChange = new EventEmitter<string>();
  ngOnInit(){
    this.routeSubscription = this.route.queryParams.subscribe(params => {
      const id = +params['numero']; // Récupérer 'id' depuis les query params
      console.log("coucou"+id);
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
    const answers: { [key: number]: boolean } = this.awnser_service.getAllAnswers();
          const result2 = Object.keys(answers).filter(key => !answers[+key]);
      this.matchingIds = [];
    
      // Trouver les noms associés aux IDs trouvés dans navigation_data
      const correspondingNames = result2.map(id => navigation_data.data[+id]?.nom).filter(nom => nom !== undefined);
    
      // Parcourir navigation_data_solutions pour trouver les IDs qui correspondent aux sous_catégories
      this.matchingIds = navigation_data_solutions.data
        .filter(item => correspondingNames.includes(item.sous_categorie))
        .map(item => item.id);
        
    // Convert users data to options in the required format
    this.indice_reponse= this.matchingIds.indexOf(this.currentNumber );
    console.log(this.matchingIds+" "+this.matchingIds[this.indice_reponse] +"   "+this.matchingIds.indexOf(5)+"   "+this.indice_reponse);
    this.cat = navigation_data_solutions.data[this.currentNumber]?.categorie;
    this.catChange.emit(this.cat);
  }
  updateQueryParams(): void {
    this.router.navigate([], {
      queryParams: { numero: ''+this.currentNumber},
      queryParamsHandling: 'merge', // Merge avec les paramètres existants
      skipLocationChange: false // Mettre à jour l'URL dans la barre d'adresse
    });
  }
  // Changement de carte
  changeCard() {
    console.log("l'indice de réponse est  "+this.indice_reponse+" et le nombre de la question correspondant est "+this.currentNumber);
    if (this.avance && this.indice_reponse<this.matchingIds.length-1) {
      this.indice_reponse += 1;
      this.currentNumber= this.matchingIds[this.indice_reponse];
      this.cat = navigation_data_solutions.data[this.currentNumber]?.categorie;
      this.updateQueryParams();
    }else if(this.avance && this.indice_reponse==this.matchingIds.length-1){
      this.router.navigate(['regles_conclusion'])
    }else if (!this.avance && this.indice_reponse >= 1 ) {
      this.indice_reponse -= 1;
      this.currentNumber= this.matchingIds[this.indice_reponse];
      this.cat = navigation_data_solutions.data[this.currentNumber]?.categorie;
      this.updateQueryParams();
      }
      else if(!this.avance){
        this.router.navigate(['regles_solutions'])
      }
      else{
        this.cat = navigation_data_solutions.data[this.indice_reponse]?.categorie;
      }
      
    this.cardChange.emit(this.indice_reponse); //Mise a jour des paramètres 
    this.catChange.emit(this.cat);
  }

}
