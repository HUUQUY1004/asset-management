package com.assetmanagement.assetmanagement.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class UsageHistory { //Lịch sử sử dụng
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "asset_id", referencedColumnName = "id")
    private Asset asset;
    
    private LocalDateTime usageStartTime;
    private LocalDateTime usageEndTime;
    
    @ManyToOne
    @JoinColumn(name = "user_account_id", referencedColumnName = "id")
    private UserAccount user;

    // Getters và Setters
}
