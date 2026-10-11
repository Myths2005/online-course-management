
package com.example.course.controller;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.example.course.entity.Enrollment;
import com.example.course.repository.EnrollmentRepository;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/enrollments")
public class EnrollmentController {

    private final EnrollmentRepository enrollmentRepository;

    public EnrollmentController(
            EnrollmentRepository enrollmentRepository) {

        this.enrollmentRepository = enrollmentRepository;
    }

    // Get all enrollments
    @GetMapping
    public List<Enrollment> getAllEnrollments() {

        return enrollmentRepository.findAll();
    }

    // Get enrollments for a particular user
    @GetMapping("/user/{userId}")
    public List<Enrollment> getUserEnrollments(
            @PathVariable Long userId) {

        return enrollmentRepository.findByUserId(userId);
    }

    // Create a new enrollment
   
    
    @PostMapping
    public Enrollment createEnrollment(@RequestBody Enrollment enrollment) {

        boolean alreadyEnrolled =
                enrollmentRepository.existsByUserIdAndCourseId(
                        enrollment.getUserId(),
                        enrollment.getCourseId()
                );

        if (alreadyEnrolled) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "You are already enrolled in this course."
            );
        }

        enrollment.setEnrollmentDate(LocalDate.now());

        if (enrollment.getStatus() == null
                || enrollment.getStatus().isBlank()) {
            enrollment.setStatus("ACTIVE");
        }

        enrollment.setProgress(0);

        return enrollmentRepository.save(enrollment);
    }

    // Update learning progress
    @PutMapping("/{id}/progress")
    public Enrollment updateProgress(
            @PathVariable Long id,
            @RequestBody Map<String, Integer> request) {

        Enrollment enrollment = enrollmentRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Enrollment not found"));

        Integer progress = request.get("progress");

        // Validate progress percentage
        if (progress == null ||
                progress < 0 ||
                progress > 100) {

            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Progress must be between 0 and 100");
        }

        // Save progress
        enrollment.setProgress(progress);

        // Update enrollment status
        if (progress == 100) {
            enrollment.setStatus("COMPLETED");
        } else {
            enrollment.setStatus("ACTIVE");
        }

        return enrollmentRepository.save(enrollment);
    }

    // Delete an enrollment
    @DeleteMapping("/{id}")
    public String deleteEnrollment(
            @PathVariable Long id) {

        if (!enrollmentRepository.existsById(id)) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "Enrollment not found");
        }

        enrollmentRepository.deleteById(id);

        return "Enrollment deleted successfully";
    }
}
