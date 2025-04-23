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
import { QuestionService } from '../../../services/question.service';

@Component({
  selector: 'app-update-question',
  imports: [MatButtonModule,MatIconModule,MatDividerModule,MatListModule,MatCardModule,MatFormFieldModule,MatInputModule,CommonModule,FormsModule,MatSelectModule,MatSlideToggleModule],
  templateUrl: './update-question.component.html',
  styleUrl: './update-question.component.css'
})
export class UpdateQuestionComponent {
  qid:any; //quiz id
  qtitle:any; //quiz title
  quesid: number = 0;
  question = {
    quiz:{qId:0,},
    content:'',
    option1:'',
    option2:'',
    option3:'',
    option4:'',
    answer:'',
  }

  constructor(private _route:ActivatedRoute,
            private _question:QuestionService,
          private _snack:MatSnackBar,private _router:Router) {}

  ngOnInit()
  {
    this.quesid = this._route.snapshot.params['quesId'];
    this.qid = this._route.snapshot.params['qid'];
    this.qtitle = this._route.snapshot.params['qtitle'];
    this._question.getQuestion(this.quesid).subscribe((data:any)=>{
      this.question = data;
      console.log("inside update ques",this._question);
    },(error)=>{
      console.log(error);
      Swal.fire("Error","Server error !!","error");
    });
  }

  formSubmit()
  {
    if(this.question.content.trim()=='' || this.question.content==null)
      {
        this._snack.open("Content is required!!","",{
          duration:2000,
        });
        return;
      }
      if(this.question.answer.trim()=='' || this.question.answer==null)
      {
        this._snack.open("Answer is required!!","",{
          duration:2000,
        });
        return;
      }

      this._question.update(this.question).subscribe((data)=>{
            console.log(data);
            Swal.fire("Success","Question updated successfully!!","success");
            this._router.navigate([`/admin/view-questions/${this.qid}/${this.qtitle}`]);

      
          },(error)=>{
            console.log(error);
            Swal.fire("Error","Server error !!","error");
          })
  }


}
