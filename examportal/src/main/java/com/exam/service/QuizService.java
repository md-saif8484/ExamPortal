package com.exam.service;

import java.util.List;
import java.util.Set;

import com.exam.entity.exam.Category;
import com.exam.entity.exam.Quiz;

public interface QuizService {
	
	public Quiz addQuiz(Quiz quiz);
	public Quiz updateQuizz(Quiz quiz);
	public Set<Quiz> getQuizzes();
	public Quiz getQuiz(Long qId);
	public void deleteQuiz(Long qId);
	public List<Quiz> getQuizOfCategory(Category category);
	public List<Quiz> getActiveQuizzes();
	public List<Quiz> getActiveQuizzesOfCategory(Category c);
}
