package com.example.course.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.course.entity.User;
import com.example.course.repository.UserRepository;

@RestController
@RequestMapping("/profile")
@CrossOrigin(origins = "*")
public class ProfileController {

    private final UserRepository userRepository;

    public ProfileController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/{id}")
    public User getProfile(@PathVariable Long id) {

        return userRepository.findById(id).orElseThrow();
    }

    @PutMapping("/{id}")
    public User updateProfile(
            @PathVariable Long id,
            @RequestBody User user) {

        User existingUser = userRepository.findById(id).orElseThrow();

        existingUser.setName(user.getName());
        existingUser.setEmail(user.getEmail());
        existingUser.setMobilePhone(user.getMobilePhone());
        existingUser.setAddress(user.getAddress());
        existingUser.setIdNumber(user.getIdNumber());
        existingUser.setInstitution(user.getInstitution());
        existingUser.setDepartment(user.getDepartment());

        return userRepository.save(existingUser);
    }
}