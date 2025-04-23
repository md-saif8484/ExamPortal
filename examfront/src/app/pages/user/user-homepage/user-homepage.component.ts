import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from '../../../services/quiz.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule, Routes } from '@angular/router';

@Component({
  selector: 'app-user-homepage',
  imports: [CommonModule,MatCardModule,MatButtonModule,RouterModule],
  templateUrl: './user-homepage.component.html',
  styleUrl: './user-homepage.component.css'
})
export class UserHomepageComponent {

  catId:any;
  quizzes: any[] = [];

  constructor(private _route:ActivatedRoute, private _quiz:QuizService) {}

  ngOnInit(){
    
    this._route.params.subscribe((params)=>{
      this.catId = params['catId'];
      console.log(this.catId);
      if(this.catId==0)
      {
        console.log("load all the quiz");
        this._quiz.getActiveQuizzes().subscribe((data)=>{
          this.quizzes = data;
          console.log(this.quizzes);

        },(error)=>{
          console.log(error);
          Swal.fire("Error","Server error","error");
        })
      }
      else{
        console.log("load spqcific quiz");
        this._quiz.getActiveQuizzesOfCategory(this.catId).subscribe((data)=>{
          this.quizzes = data;
        },(error)=>{
          console.log(error);
          Swal.fire("Error","Server error","error");
        })
      }
    });
    
  }


}
