import { Component } from '@angular/core';
import {Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import * as XLSX from 'xlsx';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-excel',
  imports: [ButtonModule, DividerModule, CommonModule],
  templateUrl: './excel.component.html',
  styleUrl: './excel.component.css'
})

export class ExcelComponent {
  
  //Ceci est un exemple, à remplacer avec le vrai excel qui sera contenu dans le service j'imagine
  userList : any = [

    {
    
    "id": 1,
    
    "name": "Leanne Graham",
    
    "username": "Bret",
    
    "email": "Sincere@april.biz"
    
    },
    
    {
    
    "id": 2,
    
    "name": "Ervin Howell",
    
    "username": "Antonette",
    
    "email": "Shanna@melissa.tv"
    
    },
    
    {
    
    "id": 3,
    
    "name": "Clementine Bauch",
    
    "username": "Samantha",
    
    "email": "Nathan@yesenia.net"
    
    },
    
    {
    
    "id": 4,
    
    "name": "Patricia Lebsack",
    
    "username": "Karianne",
    
    "email": "Julianne.OConner@kory.org"
    
    },
    
    {
    
    "id": 5,
    
    "name": "Chelsey Dietrich",
    
    "username": "Kamren",
    
    "email": "Lucio_Hettinger@annie.ca"
    
    }
    
    ]

  constructor(private router:Router) {}

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

