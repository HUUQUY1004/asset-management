package com.assetmanagement.assetmanagement.controller;

import com.assetmanagement.assetmanagement.service.NotifyService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("manager/notify")
@RequiredArgsConstructor
public class NotifyController {
    @Autowired
    private NotifyService notifyService;

    @GetMapping("/get-all")
    public ResponseEntity<?> getAllNotify() {
        return ResponseEntity.ok(notifyService.getNotifies());
    }
}
