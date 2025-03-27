package com.assetmanagement.assetmanagement.controller;

import com.assetmanagement.assetmanagement.entity.UserAccount;
import com.assetmanagement.assetmanagement.service.UserAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user-accounts")
public class UserAccountController {

    @Autowired
    private UserAccountService userAccountService;

    // API khóa tài khoản người dùng
    @PutMapping("/{id}/lock")
    public ResponseEntity<UserAccount> lockUserAccount(@PathVariable Long id) {
        UserAccount lockedUser = userAccountService.lockUserAccount(id);
        return new ResponseEntity<>(lockedUser, HttpStatus.OK);
    }

    // API mở khóa tài khoản người dùng
    @PutMapping("/{id}/unlock")
    public ResponseEntity<UserAccount> unlockUserAccount(@PathVariable Long id) {
        UserAccount unlockedUser = userAccountService.unlockUserAccount(id);
        return new ResponseEntity<>(unlockedUser, HttpStatus.OK);
    }
    @GetMapping("/getAllUserStatus")
    public ResponseEntity<List<UserAccount>> getAllUserStatus() {
        List<UserAccount> listUs = userAccountService.getAllUserAccounts();
        return new ResponseEntity<>(listUs, HttpStatus.OK);
    }
}
