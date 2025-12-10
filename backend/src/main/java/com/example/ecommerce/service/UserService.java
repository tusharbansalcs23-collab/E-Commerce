package com.example.ecommerce.service;

import com.example.ecommerce.entity.User;
import com.example.ecommerce.repository.UserRepository;
import com.example.ecommerce.security.JwtUtil;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository repo;
    private final PasswordEncoder encoder;
    private final JwtUtil jwtUtil;

    public UserService(UserRepository repo, PasswordEncoder encoder, JwtUtil jwtUtil) {
        this.repo = repo;
        this.encoder = encoder;
        this.jwtUtil = jwtUtil;
    }

    public User register(String email, String password) {
        if (email == null || password == null) return null;

        if (repo.findByEmail(email) != null) return null;

        User user = new User();
        user.setEmail(email);
        user.setPassword(encoder.encode(password));

        // MAKE THIS EMAIL ADMIN (optional)
        if (email.equals("admin@gmail.com")) {
            user.setRole("ADMIN");
        } else {
            user.setRole("USER");
        }

        return repo.save(user);
    }

    public String login(String email, String password) {
        User user = repo.findByEmail(email);

        if (user == null) return null;
        if (!encoder.matches(password, user.getPassword())) return null;

        return jwtUtil.generateToken(user.getEmail(), user.getRole()); // NEW ROLE SUPPORT
    }
}
