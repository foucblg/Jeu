import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges, inject } from '@angular/core';
import { AnswerStorageService } from '../../../answer-storage.service';

@Component({
  selector: 'app-theme-indicator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './theme-indicator.component.html',
  styleUrls: ['./theme-indicator.component.css']
})
export class ThemeIndicatorComponent implements OnChanges {
  @Input() id: number = 0;
  answerStorageService: AnswerStorageService = inject(AnswerStorageService);
  index_cat: number = 0;
  percentage: number = 0;
  cat: string = this.answerStorageService.getCategorie(this.id);
  categories: string[] = this.answerStorageService.getCategories();

  ngOnInit(): void {
    this.updateProgress();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['id']) {
      this.updateProgress();
    }
  }

  updateProgress(): void {
    this.cat = this.answerStorageService.getCategorie(this.id);
    console.log(this.cat);
    this.index_cat = this.categories.indexOf(this.cat);
    this.percentage = this.answerStorageService.getPercentage(this.id);
    console.log(this.percentage);
  }
}