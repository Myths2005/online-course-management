
package com.example.course.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.course.entity.Enrollment;

public interface EnrollmentRepository
        extends JpaRepository<Enrollment, Long> {

    List<Enrollment> findByUserId(Long userId);
    boolean existsByUserIdAndCourseId(Long userId, Long courseId);
}

