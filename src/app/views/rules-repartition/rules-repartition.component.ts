import { Component } from '@angular/core';
import {Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ActionBarComponent } from '../../shared/action-bar/action-bar.component';

@Component({
  selector: 'app-rules-repartition',
  imports: [ButtonModule],
  templateUrl: './rules-repartition.component.html',
  styleUrl: './rules-repartition.component.css'
})
export class RulesRepartitionComponent {
  constructor(private router:Router) {}
    continuer(){
      this.router.navigate(['./MODIFIER_POUR_LE_BON'])
    }
}
