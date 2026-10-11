package com.example.course.controller;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.course.entity.User;
import com.example.course.repository.UserRepository;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/login")
public class LoginController {

    private final UserRepository userRepository;

    public LoginController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping
    public Map<String, Object> login(@RequestBody User user) {

        Optional<User> existingUser =
                userRepository.findByEmailAndPassword(
                        user.getEmail(),
                        user.getPassword()
                );

        Map<String, Object> response =
                new HashMap<>();

        if (existingUser.isPresent()) {

            User loggedInUser =
                    existingUser.get();

            response.put("message",
                    "Login successful");

            response.put("userId",
                    loggedInUser.getId());

            response.put("name",
                    loggedInUser.getName());

            response.put("email",
                    loggedInUser.getEmail());

            response.put("role",
                    loggedInUser.getRole());

        } else {

            response.put("message",
                    "Invalid email or password");
        }

        return response;
    }
}