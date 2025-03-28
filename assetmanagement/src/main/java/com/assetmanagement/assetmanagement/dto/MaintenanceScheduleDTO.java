package com.assetmanagement.assetmanagement.DTO;

import java.time.LocalDateTime;

public class MaintenanceScheduleDTO {
    private Long id;
    private Long assetId;
    private String frequency;
    private LocalDateTime nextMaintenanceDate;
    private String assetName;

    public MaintenanceScheduleDTO(Long id, Long assetId, String frequency, LocalDateTime nextMaintenanceDate, String assetName) {
        this.id = id;
        this.assetId = assetId;
        this.frequency = frequency;
        this.nextMaintenanceDate = nextMaintenanceDate;
        this.assetName = assetName;
    }

    // Getters
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

    public String getAssetName() {
        return assetName;
    }

    @Override
    public String toString() {
        return "MaintenanceScheduleDTO{" +
                "id=" + id +
                ", assetId=" + assetId +
                ", frequency='" + frequency + '\'' +
                ", nextMaintenanceDate=" + nextMaintenanceDate +
                ", assetName='" + assetName + '\'' +
                '}';
    }
}