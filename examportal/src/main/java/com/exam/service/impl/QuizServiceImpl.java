package com.exam.service.impl;

import java.util.LinkedHashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.exam.entity.exam.Quiz;
import com.exam.repo.QuizRepository;
import com.exam.service.QuizService;
@Service
public class QuizServiceImpl implements QuizService{
	
	@Autowired
	private QuizRepository quizRepository;
	
	@Override
	public Quiz addQuiz(Quiz quiz) {
		
		return this.quizRepository.save(quiz);
	}

	@Override
	public Quiz updateQuizz(Quiz quiz) {
		return this.quizRepository.save(quiz);
	}

	@Override
	public Set<Quiz> getQuizzes() {
		return new LinkedHashSet<>(this.quizRepository.findAll());
	}

	@Override
	public Quiz getQuiz(Long qId) {
		return this.quizRepository.findById(qId).get();
	}

	@Override
	public void deleteQuiz(Long qId) {
		this.quizRepository.deleteById(qId);
	}

}
