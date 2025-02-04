import { Component } from '@angular/core';
import {Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ActionBarComponent } from '../../shared/action-bar/action-bar.component';

@Component({
  selector: 'app-rules-conclusion',
  imports: [ButtonModule, ActionBarComponent],
  templateUrl: './rules-conclusion.component.html',
  styleUrl: './rules-conclusion.component.css'
})
export class RulesConclusionComponent {
  constructor(private router:Router) {}
      continuer(){
        this.router.navigate(['./homepage'])
      }

      actionButtons = [
        { label: 'Continuer', action: () => this.continuer() }
      ];
}
