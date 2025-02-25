import { Component } from '@angular/core';
import {Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ActionBarComponent } from '../../shared/action-bar/action-bar.component';
import { ImageModule } from 'primeng/image';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css',
  imports: [ButtonModule, ImageModule]
})
export class HomepageComponent {
  constructor(private router:Router) {}

  commencer(){
    this.router.navigate(['./contexte'])
  }

}
