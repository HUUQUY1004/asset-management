package com.assetmanagement.assetmanagement.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class ExpenseReport { //Báo cáo chi phí
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "asset_id", referencedColumnName = "id")
    private Asset asset;
    
    private LocalDate reportDate;
    private BigDecimal costAmount;
    private String description;

    // Getters và Setters
}
