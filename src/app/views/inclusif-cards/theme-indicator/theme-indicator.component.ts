import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-theme-indicator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './theme-indicator.component.html',
  styleUrls: ['./theme-indicator.component.css']
})
export class ThemeIndicatorComponent implements OnChanges {
  @Input() cat!: string;

  categories: string[] = [
    'Gestion de projet',
    'Expérience utilisateur',
    'Interface utilisateur',
    'Développement',
    'Editorial'
  ];

  progressValue: number = 0;
  index_cat: number = 0;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['cat']) {
      this.updateProgress();
    }
  }

  updateProgress(): void {
    console.log(this.cat);
    const index = this.categories.indexOf(this.cat);
    if (index !== -1) {
      this.progressValue = (index / (this.categories.length - 1)) * 100;
    } else {
      this.progressValue = 0;
    }
    this.index_cat = this.categories.indexOf(this.cat);
  }
}