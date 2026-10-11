package com.example.course.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.course.entity.Course;

public interface CourseRepository extends JpaRepository<Course, Long> {

}