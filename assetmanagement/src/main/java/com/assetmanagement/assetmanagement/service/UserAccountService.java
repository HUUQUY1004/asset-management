package com.assetmanagement.assetmanagement.service;

import com.assetmanagement.assetmanagement.entity.UserAccount;
import com.assetmanagement.assetmanagement.repository.UserAccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserAccountService {

    @Autowired
    private UserAccountRepository userAccountRepository;

    // Phương thức khóa tài khoản
    public UserAccount lockUserAccount(Long userId) {
        UserAccount user = userAccountRepository.findById(userId).orElseThrow(() -> new RuntimeException("Người dùng không tồn tại"));
        user.setStatus("bị khóa");
        return userAccountRepository.save(user);
    }

    // Phương thức mở khóa tài khoản
    public UserAccount unlockUserAccount(Long userId) {
        UserAccount user = userAccountRepository.findById(userId).orElseThrow(() -> new RuntimeException("Người dùng không tồn tại"));
        user.setStatus("hoạt động");
        return userAccountRepository.save(user);
    }
}
