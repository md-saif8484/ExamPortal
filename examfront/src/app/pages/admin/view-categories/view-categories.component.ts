import { Component } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import Swal from 'sweetalert2';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterModule, Routes } from '@angular/router';
interface Category {
  id: number;
  title: string;
  description: string;
}
@Component({
  selector: 'app-view-categories',
  imports: [MatButtonModule,MatIconModule,MatDividerModule,MatListModule,MatCardModule,CommonModule,RouterModule],
  templateUrl: './view-categories.component.html',
  styleUrl: './view-categories.component.css'
})



export class ViewCategoriesComponent {
  categories: Category[] = []; 
    constructor(private category:CategoryService) {}
  
    ngOnInit(){
      this.category.categories().subscribe((data:any)=>{
        this.categories = data;
        console.log(this.categories);
      },
      (error)=>{
        console.log(error);
        Swal.fire("Error!!","Error in loading data");
      });
    }
}
