package com.exam.controller;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.exam.entity.exam.Question;
import com.exam.entity.exam.Quiz;
import com.exam.service.QuestionService;
import com.exam.service.QuizService;

@RestController
@RequestMapping("/question")
public class QuestionController {
	
	@Autowired
	private QuestionService questionService;
	@Autowired
	private QuizService quizService;
	
	@PostMapping("/")
	public ResponseEntity<Question> add(@RequestBody Question question)
	{
		return ResponseEntity.ok(this.questionService.addQuestion(question));
	}
	
	@GetMapping("/{qid}")
	public ResponseEntity<Question> getQuestion(@PathVariable("qid") Long qid)
	{
		return ResponseEntity.ok(this.questionService.getQuestion(qid));
	}
	
	@GetMapping("/")
	public ResponseEntity<?> getQuestions()
	{
		return ResponseEntity.ok(this.questionService.getQuestions());
	}
	
	@PutMapping("/")
	public ResponseEntity<?> update(@RequestBody Question question)
	{
		return ResponseEntity.ok(this.questionService.updateQuestion(question));
	}
	
	@DeleteMapping("/{qid}")
	public void delete(@PathVariable("qid") Long qid)
	{
		this.questionService.deleteQuestion(qid);
	}
	
//	get questions of quiz
	@GetMapping("/quiz/{qid}")
	public ResponseEntity<?> getQuestionsOfQuiz(@PathVariable("qid") Long qid)
	{
//		Quiz quiz = new Quiz();
//		quiz.setqId(qid);
//		Set<Question> questionOfQuiz = this.questionService.getQuestionOfQuiz(quiz);
//		return ResponseEntity.ok(questionOfQuiz);
		System.out.println("inside getquestionofquiz controller");
		Quiz quiz = this.quizService.getQuiz(qid);
		Set<Question> questions = quiz.getQuestions();
		List list = new ArrayList(questions);
		if(list.size()>Integer.parseInt(quiz.getNumberOfQuestions()))
		{
			list = list.subList(0, Integer.parseInt(quiz.getNumberOfQuestions()+1));
		}
		Collections.shuffle(list);
		return ResponseEntity.ok(list);
	}
	
	@GetMapping("/quiz/all/{qid}")
	public ResponseEntity<?> getQuestionsOfQuizAdmin(@PathVariable("qid") Long qid)
	{
		Quiz quiz = new Quiz();
		quiz.setqId(qid);
		Set<Question> questionOfQuiz = this.questionService.getQuestionOfQuiz(quiz);
		return ResponseEntity.ok(questionOfQuiz);
		
	}
	
	
	
	
	
}
