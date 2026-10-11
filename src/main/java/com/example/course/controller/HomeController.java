package com.example.course.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    
    @GetMapping("/")
    public String home() {
        return "forward:/frontend/index.html";
    }
}
