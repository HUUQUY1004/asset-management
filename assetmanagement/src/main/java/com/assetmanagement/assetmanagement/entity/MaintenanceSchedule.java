package com.assetmanagement.assetmanagement.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MaintenanceSchedule {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long assetId; // ID của tài sản

    @Column(nullable = false)
    private String frequency; // daily, weekly, monthly

    private LocalDateTime nextMaintenanceDate;

    public Long getId() {
        return id;
    }

    public Long getAssetId() {
        return assetId;
    }

    public String getFrequency() {
        return frequency;
    }

    public LocalDateTime getNextMaintenanceDate() {
        return nextMaintenanceDate;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setAssetId(Long assetId) {
        this.assetId = assetId;
    }

    public void setFrequency(String frequency) {
        this.frequency = frequency;
    }

    public void setNextMaintenanceDate(LocalDateTime nextMaintenanceDate) {
        this.nextMaintenanceDate = nextMaintenanceDate;
    }

    @Override
    public String toString() {
        return "MaintenanceSchedule{" +
                "id=" + id +
                ", assetId=" + assetId +
                ", frequency='" + frequency + '\'' +
                ", nextMaintenanceDate=" + nextMaintenanceDate +
                '}';
    }
}
