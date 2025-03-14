import { Component } from '@angular/core';
import {Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
@Component({
  selector: 'app-rules-solutions',
  imports: [ButtonModule, DividerModule],
  templateUrl: './rules-solutions.component.html',
  styleUrl: './rules-solutions.component.css'
})
export class RulesSolutionsComponent {
  constructor(private router:Router) {}
    continuer(){
      this.router.navigate(['./regles_conclusion'])
    }
}
