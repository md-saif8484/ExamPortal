package com.exam.service;

import java.util.Set;

import com.exam.entity.exam.Quiz;

public interface QuizService {
	
	public Quiz addQuiz(Quiz quiz);
	public Quiz updateQuizz(Quiz quiz);
	public Set<Quiz> getQuizzes();
	public Quiz getQuiz(Long qId);
	public void deleteQuiz(Long qId);
	
}
