import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  selector: 'app-add-questions',
  imports: [MatButtonModule,MatIconModule,MatDividerModule,MatListModule,MatCardModule,MatFormFieldModule,MatInputModule,CommonModule,FormsModule,MatSelectModule,MatSlideToggleModule],
  templateUrl: './add-questions.component.html',
  styleUrl: './add-questions.component.css'
})
export class AddQuestionsComponent {
  qid: number = 0;
  qtitle:any;
  question = {
    quiz:{qId:0,},
    content:'',
    option1:'',
    option2:'',
    option3:'',
    option4:'',
    answer:'',
  }
  constructor(private _route:ActivatedRoute,private _snack:MatSnackBar,private _question:QuestionService) {}

  ngOnInit() {
    this.qid = this._route.snapshot.params['qid'];
    this.qtitle = this._route.snapshot.params['qtitle'];
    this.question.quiz.qId = this.qid;
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

    this._question.addquestion(this.question).subscribe((data)=>{
      console.log(data);
      Swal.fire("Success","Question added successfully!!","success");
      this.question.answer='';
      this.question.content='';
      this.question.option1='';
      this.question.option2='';
      this.question.option3='';
      this.question.option4='';

    },(error)=>{
      console.log(error);
      Swal.fire("Error","Server error !!","error");
    })

  }
}
