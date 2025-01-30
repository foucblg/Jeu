import { Component } from '@angular/core';
import {Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ActionBarComponent } from '../components/action-bar/action-bar.component';

@Component({
  selector: 'app-rules-analysis',
  imports: [ButtonModule, ActionBarComponent],
  templateUrl: './rules-analysis.component.html',
  styleUrl: './rules-analysis.component.css'
})
export class RulesAnalysisComponent {
  constructor(private router:Router) {}
      continuer(){
        this.router.navigate(['./rules_solutions'])
      }

      actionButtons = [
        { label: 'Continuer', action: () => this.continuer()}
      ];
}
