package com.exam.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.exam.entity.exam.Category;
import com.exam.entity.exam.Quiz;

public interface QuizRepository extends JpaRepository<Quiz, Long>{

	List<Quiz> findByCategory(Category category);
	
	List<Quiz> findByActive(Boolean b);
	List<Quiz> findByCategoryAndActive(Category c,Boolean b);

}
