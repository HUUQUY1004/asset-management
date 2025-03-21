package com.assetmanagement.assetmanagement.service;

import com.assetmanagement.assetmanagement.dto.LoginRequest;
import com.assetmanagement.assetmanagement.dto.RegisterRequest;
import com.assetmanagement.assetmanagement.entity.UserAccount;
import com.assetmanagement.assetmanagement.repository.UserAccountRepository;
import com.assetmanagement.assetmanagement.security.JwtService;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.LockedException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;

@Service
public class AuthService {
    @Autowired
    private UserAccountRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtService jwtService;

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

    public String login(LoginRequest request) {
        try {
            var auth = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getUsername(),
                            request.getPassword()
                    )
            );
            var claims = new HashMap<String, Object>();
            var user = (UserAccount) auth.getPrincipal();
            var jwtToken = jwtService.generateToken(claims, user);
            return jwtToken;
        } catch (Exception ex) {
            throw new RuntimeException(ex.getMessage());
        }
    }
}
