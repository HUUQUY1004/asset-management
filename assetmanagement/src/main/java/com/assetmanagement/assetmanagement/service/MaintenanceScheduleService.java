package com.assetmanagement.assetmanagement.service;

import com.assetmanagement.assetmanagement.DTO.MaintenanceScheduleDTO;
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
            case "quarterly": // 3 tháng 1 lần
                schedule.setNextMaintenanceDate(LocalDateTime.now().plusMonths(3));
                break;
            case "semi-annually": // 6 tháng 1 lần
                schedule.setNextMaintenanceDate(LocalDateTime.now().plusMonths(6));
                break;
            case "every-9-months": // 9 tháng 1 lần
                schedule.setNextMaintenanceDate(LocalDateTime.now().plusMonths(9));
                break;
            case "annually": // 1 năm 1 lần
                schedule.setNextMaintenanceDate(LocalDateTime.now().plusYears(1));
                break;
            default:
                throw new IllegalArgumentException("Tần suất không hợp lệ: " + schedule.getFrequency());
        }
        return maintenanceScheduleRepository.save(schedule);
    }

    public List<MaintenanceScheduleDTO> getAllSchedules() {
        return maintenanceScheduleRepository.getMaintenanceSchedule();
    }
}
