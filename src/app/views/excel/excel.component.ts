import { Component } from '@angular/core';
import {Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import * as XLSX from 'xlsx';
import { CommonModule } from '@angular/common';
import { UserService } from '../../shared/user-service';
import { navigation_data_solutions } from "../../app.component";

@Component({
  selector: 'app-excel',
  imports: [ButtonModule, DividerModule, CommonModule],
  templateUrl: './excel.component.html',
  styleUrl: './excel.component.css'
})

export class ExcelComponent {
  users: any;
  maxTaskIndexes: number[] = [];

  constructor(private router: Router, private service: UserService) {}

  ngOnInit(): void {
    // Récupération de tous les utilisateurs
    this.users = this.service.getUsers();

    // Chargement du JSON
    const answersData = navigation_data_solutions.data;

    // Remplacement des IDs des tâches par les noms des catégories et des tâches, pour meilleur affichage dans l'excel
    this.users.forEach((user: any) => {
      if (user.getTask) {
        const tasks = user.getTask();
        tasks.forEach((task: any) => {
          const taskData = answersData.find((data: any) => data.id === task.getId());
          if (taskData) {
            task.id = `${taskData.categorie} - ${taskData.titre}`;
          }
        });
      }
    });

    // Calcul du nombre maximum de tâches parmi tous les utilisateurs
    const maxTasks = Math.max(...this.users.map((user: any) => user.getTask().length));
    this.maxTaskIndexes = Array.from({ length: maxTasks }, (_, i) => i);
  }

  /* Fonction pour ajouter des colonnes vides pour les utilisateurs qui n'ont pas de tâches */
  emptyColumns(taskCount: number): number[] {
    const maxTasks = this.maxTaskIndexes.length;
    return Array.from({ length: maxTasks - taskCount });
  }

  continuer() {
    this.router.navigate(['./regles_conclusion']);
  }

  /* Fonction pour exporter les données au format Excel */
  exportexcel(): void {
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    // Nom du fichier 
    XLSX.writeFile(wb, 'Resultats_JEU.xlsx');
  }
}

