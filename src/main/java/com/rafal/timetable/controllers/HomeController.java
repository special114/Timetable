package com.rafal.timetable.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    @GetMapping({"/", "/home", "show-timetable"})
    public String home() {
        return "index";
    }
}