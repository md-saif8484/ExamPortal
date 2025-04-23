package com.exam.controller;

import java.util.List;

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

import com.exam.entity.exam.Category;
import com.exam.entity.exam.Quiz;
import com.exam.service.QuizService;

@RestController
@RequestMapping("/quiz")
public class QuizController {
	
	@Autowired
	private QuizService quizService;
	
	
	
	@PostMapping("/")
	public ResponseEntity<Quiz> add(@RequestBody Quiz quiz)
	{
		return ResponseEntity.ok(this.quizService.addQuiz(quiz));
	}
	
	@GetMapping("/")
	public ResponseEntity<?> getQuizzes()
	{
		return ResponseEntity.ok(this.quizService.getQuizzes());
	}
	
	@GetMapping("/{qid}")
	public ResponseEntity<Quiz> getQuiz(@PathVariable("qid") Long qid)
	{
		return ResponseEntity.ok(this.quizService.getQuiz(qid));
	}
	
	@PutMapping("/")
	public ResponseEntity<Quiz> updateQuiz(@RequestBody Quiz quiz)
	{
		return ResponseEntity.ok(this.quizService.updateQuizz(quiz));
	}
	
	@DeleteMapping("/{qid}")
	public void deleteQuiz(@PathVariable("qid") Long qid) {
	    System.out.println("Inside delete quiz controller. Quiz ID: " + qid);
	    this.quizService.deleteQuiz(qid);
	}
	
	@GetMapping("/category/{cid}")
	public List<Quiz> getQuizzesOfCategory(@PathVariable("cid") Long cid)
	{
		Category category = new Category();
		category.setId(cid);
		return this.quizService.getQuizOfCategory(category);
	}
	
//	get active quizzes
	@GetMapping("/active")
	public List<Quiz> getActiveQuiz()
	{
		return this.quizService.getActiveQuizzes();
	}
	
//	get active quizzes by category
	@GetMapping("/active/category/{cid}")
	public List<Quiz> getActiveQuizzesOfCategory(@PathVariable("cid") Long cid)
	{
		Category category = new Category();
		category.setId(cid);
		return this.quizService.getActiveQuizzesOfCategory(category);
	}
	
	
}
