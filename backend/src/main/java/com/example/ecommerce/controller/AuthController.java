package com.example.ecommerce.controller;

import com.example.ecommerce.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    private final UserService service;

    public AuthController(UserService service) {
        this.service = service;
    }

    @PostMapping("/register")
    public Map<String, Object> register(@RequestBody Map<String, String> req) {
        var user = service.register(req.get("email"), req.get("password"));

        if (user == null)
            return Map.of("success", false, "message", "Email already exists");

        return Map.of("success", true, "message", "Registered!");
    }

    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody Map<String, String> req) {
        String token = service.login(req.get("email"), req.get("password"));

        if (token == null)
            return Map.of("success", false, "message", "Invalid credentials");

        return Map.of("success", true, "token", token);
    }
}
