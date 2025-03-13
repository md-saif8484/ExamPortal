package com.exam.service.impl;

import java.util.LinkedHashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.exam.entity.exam.Category;
import com.exam.repo.CategoryRepository;
import com.exam.service.CategoryService;

@Service
public class CategoryServiceImpl implements CategoryService{

	@Autowired
	private CategoryRepository categoryRepository;
	
	@Override
	public Category addCategory(Category category) {
		
		return this.categoryRepository.save(category);
	}

	@Override
	public Category updateCategory(Category category) {
		
		return this.categoryRepository.save(category);
	}

	@Override
	public void deleteCategory(Long catId) {
		this.categoryRepository.deleteById(catId);
		
	}

	@Override
	public Category getCategory(Long catId) {
		return this.categoryRepository.findById(catId).get();
	}

	@Override
	public Set<Category> getCategories() {
		return new LinkedHashSet<>( this.categoryRepository.findAll());
	}

}
