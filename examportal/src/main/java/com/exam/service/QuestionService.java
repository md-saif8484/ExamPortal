package com.exam.service;

import java.util.Set;

import com.exam.entity.exam.Question;
import com.exam.entity.exam.Quiz;

public interface QuestionService {
	public Question addQuestion(Question question);
	public Question updateQuestion(Question question);
	public void deleteQuestion(Long qId);
	public Set<Question> getQuestions();
	public Question getQuestion(Long qId);
	public Set<Question> getQuestionOfQuiz(Quiz quiz);
	public Question get(Long quesId);
}
