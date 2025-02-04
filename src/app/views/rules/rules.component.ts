import { Component } from '@angular/core';
import {Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ActionBarComponent } from "../../shared/action-bar/action-bar.component";

@Component({
  selector: 'app-rules',
  imports: [ButtonModule, ActionBarComponent],
  templateUrl: './rules.component.html',
  styleUrl: './rules.component.css'
})
export class RulesComponent {

    constructor(private router:Router) {}
    continuer(){
      this.router.navigate(['./user-registration']);
    }

    actionButtons = [
      { label: 'Passer le quiz', action: () => this.continuer(), severity : 'secondary' as const },
      { label: 'En avant !', action: () => console.log("Quiz started") }
    ];

    startQuiz(){
      console.log("Quiz started");
    }
}
