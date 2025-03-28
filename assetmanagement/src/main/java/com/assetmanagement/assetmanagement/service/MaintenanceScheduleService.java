package com.assetmanagement.assetmanagement.service;

import com.assetmanagement.assetmanagement.entity.Asset;
import com.assetmanagement.assetmanagement.entity.MaintenanceSchedule;
import com.assetmanagement.assetmanagement.repository.MaintenanceScheduleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class MaintenanceScheduleService {
    @Autowired
    private MaintenanceScheduleRepository maintenanceScheduleRepository;

    public MaintenanceSchedule createSchedule(MaintenanceSchedule schedule) {
        // Cập nhật ngày bảo trì tiếp theo dựa trên tần suất
        switch (schedule.getFrequency()) {
            case "daily":
                schedule.setNextMaintenanceDate(LocalDateTime.now().plusDays(1));
                break;
            case "weekly":
                schedule.setNextMaintenanceDate(LocalDateTime.now().plusWeeks(1));
                break;
            case "monthly":
                schedule.setNextMaintenanceDate(LocalDateTime.now().plusMonths(1));
                break;
            default:
                break;
        }
        return maintenanceScheduleRepository.save(schedule);
    }

    public List<MaintenanceSchedule> getAllSchedules() {
        return maintenanceScheduleRepository.findAll();
    }

  
}