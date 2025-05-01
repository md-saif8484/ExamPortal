import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http:HttpClient) { }

  public getQuestionsofQuiz(qid: number)
  { 
    console.log("inside get que of quiz");
    return this.http.get(`${baseUrl}/question/quiz/all/${qid}`);
  }

  public getQuestionsofQuizForTest(qid: number)
  { 
    return this.http.get(`${baseUrl}/question/quiz/${qid}`);
  }

  public getQuestion(qid: number)
  { 
    return this.http.get(`${baseUrl}/question/${qid}`);
  }

  public addquestion(question:any)
  { 
    return this.http.post(`${baseUrl}/question/`,question);
  }

  public update(question:any)
  { 
    return this.http.put(`${baseUrl}/question/`,question);
  }

  public delete(qid:any)
  { 
    return this.http.delete(`${baseUrl}/question/${qid}`);
  }

  public eval(question:any)
  {
    return this.http.post(`${baseUrl}/question/eval`,question);
  }
}
