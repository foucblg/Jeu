import { Component } from '@angular/core';
import {Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ActionBarComponent } from '../components/action-bar/action-bar.component';

@Component({
  selector: 'app-rules-repartition',
  imports: [ButtonModule, ActionBarComponent],
  templateUrl: './rules-repartition.component.html',
  styleUrl: './rules-repartition.component.css'
})
export class RulesRepartitionComponent {
  constructor(private router:Router) {}
        continuer(){
          this.router.navigate(['solutions'])
        }

        actionButtons = [
          { label: 'Continuer', action: () => this.continuer() }
        ];
}
