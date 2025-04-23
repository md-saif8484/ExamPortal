import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule, Routes } from '@angular/router';
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
  selector: 'app-update-quiz',
  imports: [RouterModule,MatButtonModule,MatIconModule,MatDividerModule,MatListModule,MatCardModule,MatFormFieldModule,MatInputModule,CommonModule,FormsModule,MatSelectModule,MatSlideToggleModule],
  templateUrl: './update-quiz.component.html',
  styleUrl: './update-quiz.component.css'
})
export class UpdateQuizComponent {
  qId = 0;
  quiz:any;
  categories:any;
  constructor(private _route:ActivatedRoute,private _quiz:QuizService,private _cat:CategoryService,private _router:Router) {};

  ngOnInit(): void {
      this._route.paramMap.subscribe(params => {
        this.qId = Number(params.get('qid'));

        this._quiz.getQuiz(this.qId).subscribe((data)=>{
          this.quiz = data;
          console.log(this.quiz);
        },(error)=>{
          console.log(error);
          Swal.fire("Error","Server error !!","error");
        })
      });

      this._cat.categories().subscribe((data)=>{
        this.categories = data;
        console.log("inside update quiz component");
      },(error)=>{
        console.log(error);
        Swal.fire("Error","Error in loading categories!!","error");
      })
  }


  formSubmit(){
    this._quiz.updateQuiz(this.quiz).subscribe((data)=>{
      Swal.fire("Success","Updated successfully !!","success").then((e)=>{
        this._router.navigate(['/admin/quiz']);
      });

    },(error)=>{
      console.log(error);
      Swal.fire("Error","Server error!!","error");
    })
  }
}
