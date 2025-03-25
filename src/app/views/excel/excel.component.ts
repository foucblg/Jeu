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
  
  //Ceci est un exemple, à remplacer avec le vrai excel qui sera contenu dans le service j'imagine
  users : any;



  constructor(private router:Router, private service:UserService) {}
  
  ngOnInit(): void {
    this.users = this.service.getUsers();

    // Load the answers data
    const answersData = navigation_data_solutions.data;

    this.users.forEach((user: any) => {
        if (user.getTask) {
            const tasks = user.getTask();
            tasks.forEach((task: any) => {
                const taskData = answersData.find((data: any) => data.id === task.getId());
                if (taskData) {
                    // Replace the task ID with the category name and title
                    task.id = `${taskData.categorie} - ${taskData.titre}`;
                }
            });
        }
    });
  }

  continuer(){
    this.router.navigate(['./regles_conclusion'])
  }

  exportexcel(): void
  {
    /* pass here the table id */
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
 
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
 
    /* save to file */  
    XLSX.writeFile(wb, "Resultats_JEU.xlsx");
 
  }
}

