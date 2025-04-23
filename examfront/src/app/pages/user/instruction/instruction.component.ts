import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from '../../../services/quiz.service';
import Swal from 'sweetalert2';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-instruction',
  imports: [MatButtonModule,MatCardModule,MatDividerModule,CommonModule],
  templateUrl: './instruction.component.html',
  styleUrl: './instruction.component.css'
})
export class InstructionComponent {
  qid:any;
  quiz:any;
  constructor(private _route:ActivatedRoute, private _quiz:QuizService, private _router:Router){}

  ngOnInit()
  {
    this._route.params.subscribe((params)=>{
      this.qid = params['qid'];
      console.log(this.qid);

      this._quiz.getQuiz(this.qid).subscribe((data)=>{
        console.log(data);
        this.quiz = data;
      },(error)=>{
        console.log(error);
        Swal.fire("Error","Server error","error");
      })

    })
  }

  startQuiz()
  {
    Swal.fire({
          title: "Do you want to start the quiz?",
          icon: "info",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Start"
        }).then((result) => {
          if (result.isConfirmed) {
              this._router.navigate(['/start/'+this.qid]);
          }
        });
  }
}
