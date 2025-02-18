import { Component } from '@angular/core';
import {Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ActionBarComponent } from "../../shared/action-bar/action-bar.component";

@Component({
  selector: 'app-rules',
  imports: [ButtonModule],
  templateUrl: './rules.component.html',
  styleUrl: './rules.component.css'
})
export class RulesComponent {

    constructor(private router:Router) {}
    continuer(){
      this.router.navigate(['./user-registration']);
    }

    startQuiz(){
      
      this.router.navigate(['./cartes_inclusif']);
      console.log("Quiz started");
    }
}
