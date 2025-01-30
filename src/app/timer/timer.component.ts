import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit, OnDestroy {
  time: number = 3; // Temps écoulé en secondes
  private subscription: Subscription = new Subscription();

  ngOnInit(): void {
    // Observable qui émet toutes les secondes
    const timer$ = interval(1000);

    // S'abonne pour incrémenter le temps
    this.subscription = timer$.subscribe(() => {
      this.time--;
    });
  }

  ngOnDestroy(): void {
    // Désabonnement pour éviter les fuites de mémoire
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  resetTimer(): void {
    this.time = 0;
  }

  formatTime(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    // Formate chaque partie pour afficher 2 chiffres (ex: 01:09:05)
    return `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(secs)}`;
  }

  private pad(value: number): string {
    return value < 10 ? `0${value}` : value.toString();
  }
}