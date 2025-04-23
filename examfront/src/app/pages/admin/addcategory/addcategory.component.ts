import { Component } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import Swal from 'sweetalert2';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-addcategory',
  imports: [MatButtonModule,MatIconModule,MatDividerModule,MatListModule,MatCardModule,MatFormFieldModule,MatInputModule,CommonModule,FormsModule],
  templateUrl: './addcategory.component.html',
  styleUrl: './addcategory.component.css'
})
export class AddcategoryComponent {
  category = {
    title:'',
    description:''
  };

  constructor(private _category:CategoryService, private _snack:MatSnackBar) {}
  
  formSubmit()
  {
    if(this.category.title.trim()=='' || this.category.title==null)
    {
      this._snack.open("Title is required","",{
        duration:2000,
      });
      return;
    }

    this._category.addcategory(this.category).subscribe((data:any)=>{
      this.category.title='';
      this.category.description='';
      Swal.fire('Success', 'Category is added successfully!!','success');
    },
      (error)=>{
        console.log(error);
        Swal.fire('Error', 'Server error!!','error');
      }    
    );
  }
}
