import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-theme-indicator',
  standalone: true,
  imports: [],
  templateUrl: './theme-indicator.component.html',
  styleUrl: './theme-indicator.component.css'
})
export class ThemeIndicatorComponent {
  @Input() cat!: string;

  categories: string[] = [
    'Gestion de projet',
    'Expérience utilisateur',
    'Interface utilisateur',
    'Développement',
    'Editorial'
  ];
  
}
