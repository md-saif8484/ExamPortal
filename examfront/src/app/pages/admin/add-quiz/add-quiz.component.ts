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
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { QuizService } from '../../../services/quiz.service';


@Component({
  selector: 'app-add-quiz',
  imports: [MatButtonModule,MatIconModule,MatDividerModule,MatListModule,MatCardModule,MatFormFieldModule,MatInputModule,CommonModule,FormsModule,MatSelectModule,MatSlideToggleModule],
  templateUrl: './add-quiz.component.html',
  styleUrl: './add-quiz.component.css'
})
export class AddQuizComponent {
  categories:any;
  quiz = {
    title:'',
    description:'',
    maxMarks:'',
    numberOfQuestions:'',
    active:false,
    category:{
      cid:'',
    }
  };

  constructor(private _category:CategoryService,private _snack:MatSnackBar,private _quiz:QuizService) {}

  ngOnInit(){
    this._category.categories().subscribe((data)=>{
      this.categories = data;
    })
  }

  formSubmit()
  {
    if(this.quiz.title.trim()=="" || this.quiz.title==null)
    {
      this._snack.open("Title is required","",{
        duration:2000,
      })
      return;
    }

    this._quiz.addQuiz(this.quiz).subscribe((data)=>{
      console.log(data);
      Swal.fire("Success","Added successfully!!","success");
      this.quiz = {
        title:'',
        description:'',
        maxMarks:'',
        numberOfQuestions:'',
        active:false,
        category:{
          cid:'',
        }
      };
    },(error)=>{
      console.log(error);
      Swal.fire("Error","Server Error !!","error");
    })
    

  }

}
