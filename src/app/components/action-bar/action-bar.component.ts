import { Component, Input } from '@angular/core';
import { Button, ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-action-bar',
  imports: [ButtonModule],
  templateUrl: './action-bar.component.html',
  styleUrl: './action-bar.component.css'
})
export class ActionBarComponent {
  
  @Input() buttons: { label: string, action: () => void, severity? : "success" | "info" | "warn" | "danger" | "help" | "primary" | "secondary" | "contrast" | null | undefined}[] = [];

}
