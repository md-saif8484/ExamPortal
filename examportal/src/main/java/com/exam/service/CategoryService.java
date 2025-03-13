package com.exam.service;

import java.util.Set;

import com.exam.entity.exam.Category;

public interface CategoryService {
	
	public Category addCategory(Category category);
	public Category updateCategory(Category category);
	public void deleteCategory(Long catId);
	public Category getCategory(Long catId);
	public Set<Category> getCategories();
	
}
