import { Component } from '@angular/core';
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
  selector: 'app-view-quizzes',
  imports: [MatButtonModule, MatIconModule, MatDividerModule, MatListModule, MatCardModule, CommonModule,RouterModule],
  templateUrl: './view-quizzes.component.html',
  styleUrl: './view-quizzes.component.css'
})
export class ViewQuizzesComponent {
  quiz: any;
  category: any;

  constructor(private _quiz: QuizService) {}

  ngOnInit() {
    this._quiz.getQuizzes().subscribe((data: any) => {
      this.quiz = data;
      console.log(data);
    }, (error) => {
      console.log(error);
      Swal.fire("Error!!", "Error in loading data");
    });
  }

  deletequiz(qid: any) {
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
        this._quiz.deleteQuiz(qid).subscribe(
          (response) => {
            Swal.fire("Deleted!", "Your quiz has been deleted.", "success");

            // ✅ Remove the deleted quiz from the UI
            this.quiz = this.quiz.filter((q: any) => q.qid !== qid);
          },
          (error) => {
            Swal.fire("Error!!", "Error deleting quiz", "error");
            console.log(error);
          }
        );
      }
    });
  }
}
