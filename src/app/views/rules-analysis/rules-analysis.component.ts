import { Component } from '@angular/core';
import {Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ActionBarComponent } from '../../shared/action-bar/action-bar.component';

@Component({
  selector: 'app-rules-analysis',
  imports: [ButtonModule],
  templateUrl: './rules-analysis.component.html',
  styleUrl: './rules-analysis.component.css'
})
export class RulesAnalysisComponent {
  constructor(private router:Router) {}
  continuer(){
    this.router.navigate(['./cartes_inclusif'])
  }
}
