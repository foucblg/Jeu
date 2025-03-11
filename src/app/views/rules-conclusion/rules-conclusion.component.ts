import { Component } from '@angular/core';
import {Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-rules-conclusion',
  imports: [ButtonModule, DividerModule],
  templateUrl: './rules-conclusion.component.html',
  styleUrl: './rules-conclusion.component.css'
})
export class RulesConclusionComponent {
  constructor(private router:Router) {}
  continuer(){
    this.router.navigate(['./accueil'])
  }
}
