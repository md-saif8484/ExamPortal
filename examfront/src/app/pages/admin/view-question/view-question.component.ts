import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../../../services/question.service';
import { QuizService } from '../../../services/quiz.service';
import Swal from 'sweetalert2';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterModule, Routes } from '@angular/router';

@Component({
  selector: 'app-view-question',
  imports: [MatButtonModule, MatIconModule, MatDividerModule, MatListModule, MatCardModule, CommonModule,RouterModule],
  templateUrl: './view-question.component.html',
  styleUrl: './view-question.component.css'
})
export class ViewQuestionComponent {
  qid:any; //quiz id
  qtitle:any; //quiz title
  questions: any[] = [];
  constructor(private _route:ActivatedRoute,private _question:QuestionService) {}

  ngOnInit() {
    this._route.paramMap.subscribe(params => {
      this.qid = Number(params.get('id')); // Ensure it's a number
      this.qtitle = params.get('title');
  
      console.log("Quiz ID:", this.qid, "Type:", typeof this.qid);
      
      // Fetching questions only after qid is correctly assigned
      if (!isNaN(this.qid) && this.qid > 0) {
        this._question.getQuestionsofQuiz(this.qid).subscribe(
          (data:any) => 
          {
            console.log("Questions:", data);
            this.questions = data;
          },
          (error) => {
            console.log("Error fetching questions:", error);
          }
        );
      } else {
        console.error("Invalid Quiz ID:", this.qid);
      }
    });
  }

  deleteQuestion(quesId:any)
  {
    Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
        }).then((result) => {
          if (result.isConfirmed) {
            this._question.delete(quesId).subscribe(
              (response) => {
                Swal.fire("Deleted!", "Your question has been deleted.", "success");
    
                // ✅ Remove the deleted quiz from the UI
                this.questions = this.questions.filter((q: any) => q.quesId !== quesId);
              },
              (error) => {
                Swal.fire("Error!!", "Error deleting question", "error");
                console.log(error);
              }
            );
          }
        });
  }
}
