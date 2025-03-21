package com.assetmanagement.assetmanagement.service;

import com.assetmanagement.assetmanagement.dto.RegisterRequest;
import com.assetmanagement.assetmanagement.entity.UserAccount;
import com.assetmanagement.assetmanagement.repository.UserAccountRepository;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    @Autowired
    private UserAccountRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

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
