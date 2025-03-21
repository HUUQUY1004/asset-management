package com.assetmanagement.assetmanagement.service;

import com.assetmanagement.assetmanagement.dto.user.RegisterRequest;
import com.assetmanagement.assetmanagement.entity.UserAccount;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public String register(RegisterRequest request) {
        // Kiểm tra username đã tồn tại chưa
        if (userRepository.findByUsername(request.getUsername()).isPresent()) {
            throw new RuntimeException("Username already taken!");
        }

        // Lưu user vào database
        UserAccount newUser = new UserAccount();
        newUser.setUsername(request.getUsername());
        newUser.setPassword(passwordEncoder.encode(request.getPassword())); // Mã hóa mật khẩu
        userRepository.save(newUser);

        return "User registered successfully!";
    }
}
