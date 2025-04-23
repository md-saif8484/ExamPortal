import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http:HttpClient) { }

  public getQuizzes()
  {
    return this.http.get(`${baseUrl}/quiz/`);
  }

  public getQuiz(qid:any)
  {
    return this.http.get(`${baseUrl}/quiz/${qid}`);
  }

  public deleteQuiz(qid: any) {
    return this.http.delete(`${baseUrl}/quiz/${qid}`); 
  }

  public addQuiz(quiz:any)
  {
    return this.http.post(`${baseUrl}/quiz/`,quiz);
  }

  public updateQuiz(quiz:any)
  {
    return this.http.put(`${baseUrl}/quiz/`,quiz);
  }

  public getQuizOfCategory(cid:any)
  {
    return this.http.get<any[]>(`${baseUrl}/quiz/category/${cid}`)
  }

  // get active quizzes
  public getActiveQuizzes()
  {
    return this.http.get<any[]>(`${baseUrl}/quiz/active`)
  }

  // get active quizzes of category
  public getActiveQuizzesOfCategory(cid:any)
  {
    return this.http.get<any[]>(`${baseUrl}/quiz/active/category/${cid}`)
  }

}
