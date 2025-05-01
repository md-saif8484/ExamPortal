import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { QuestionService } from '../../../services/question.service';
import { LocationStrategy } from '@angular/common';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { MatCard, MatCardHeader, MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-start',
  imports: [CommonModule,FormsModule ,MatCard,MatCardHeader,MatCardModule,MatDividerModule,MatButtonModule,RouterModule,MatProgressSpinnerModule],
  templateUrl: './start.component.html',
  styleUrl: './start.component.css'
})
export class StartComponent {
  qid:any;
  questions:any;
  marksGot=0;
  attempted=0;
  correctAnswer=0;
  isSubmit=false;
  timer:any;

  constructor(private _route:ActivatedRoute,
              private _question:QuestionService,
              private locationSt:LocationStrategy){

  }

  ngOnInit(){
    this.preventBackPush();
    this.qid = this._route.snapshot.params['qid'];
    console.log(this.qid);
    this.loadQuestion();
  }

  loadQuestion()
  {
    this._question.getQuestionsofQuizForTest(this.qid).subscribe((data)=>{

      this.questions = data;
      this.timer = this.questions.length*2*60;
      console.log("questions=>",this.questions);
      this.startTimer();
    },(error)=>{
      console.log(error);
      Swal.fire("Error","Error in loading question!!","error");
    })
  }

  preventBackPush()
  {
    history.pushState(null,'',location.href);
    this.locationSt.onPopState(()=>{
      history.pushState(null,'',location.href);
    });
  }

  submitQuiz(){
    Swal.fire({
              title: "Do you want to submit the quiz?",
              icon: "info",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Submit"
            }).then((result) => {
              if (result.isConfirmed) {
                this.evalQuiz();
              }
            });
  }

  startTimer()
  {
    let t = window.setInterval(()=>{
      if(this.timer<=0)
      {
        this.evalQuiz();
        clearInterval(t);
      }
      else{
        this.timer--;
      }
    },1000);
  }

  evalQuiz()
  {
      
      this._question.eval(this.questions).subscribe((data:any)=>{
        console.log(data);
        this.attempted = data.attempted;
        console.log("answer: ",data.correctAnswer);
        console.log("attem: ",data.attempted);
        this.correctAnswer = data.correctAnswer;
        this.marksGot = data.marksGot
        this.isSubmit=true;
      },(error)=>{
        console.log(error);
      });
      // this.questions.forEach((q:any)=>{
      //   if(q.givenAnswer==q.answer)
      //   {
      //     this.correctAnswer++;
      //   }

      //   if(q.givenAnswer.trim()!='')
      //   {
      //     this.attempted++;
      //   }
      // })
      // let marksSingle = this.questions[0].quiz.maxMarks/this.questions.length;
      // this.marksGot = this.correctAnswer*marksSingle;
      // console.log("marksgot :"+this.marksGot);
      // console.log("correct answer :" + this.correctAnswer);
      // console.log("attempted : " + this.attempted);
  }

  getFormattedTime()
  {
    let mm = Math.floor(this.timer/60);
    let ss = this.timer - mm*60;

    return `${mm} min : ${ss} sec`;
  }

  printPage()
  {
    window.print();
  }

}
