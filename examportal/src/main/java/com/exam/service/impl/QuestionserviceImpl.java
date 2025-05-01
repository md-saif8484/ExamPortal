package com.exam.service.impl;

import java.util.LinkedHashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.exam.entity.exam.Question;
import com.exam.entity.exam.Quiz;
import com.exam.repo.QuestionRepository;
import com.exam.service.QuestionService;
@Service
public class QuestionserviceImpl implements QuestionService{

	@Autowired
	private QuestionRepository questionRepository;
	
	@Override
	public Question addQuestion(Question question) {
		return this.questionRepository.save(question);
	}

	@Override
	public Question updateQuestion(Question question) {
		return this.questionRepository.save(question);
	}

	@Override
	public void deleteQuestion(Long qId) {
		this.questionRepository.deleteById(qId);
		
	}

	@Override
	public Set<Question> getQuestions() {
		// TODO Auto-generated method stub
		return new LinkedHashSet<>(this.questionRepository.findAll());
	}

	@Override
	public Question getQuestion(Long qId) {
		// TODO Auto-generated method stub
		return this.questionRepository.findById(qId).get();
	}

	@Override
	public Set<Question> getQuestionOfQuiz(Quiz quiz) {
		// TODO Auto-generated method stub
		return this.questionRepository.findByQuiz(quiz);
	}

	@Override
	public Question get(Long quesId) {
		// TODO Auto-generated method stub
		return this.questionRepository.getOne(quesId);
	}

}
