package com.assetmanagement.assetmanagement.controller;


import com.assetmanagement.assetmanagement.entity.Asset;
import com.assetmanagement.assetmanagement.entity.MaintenanceSchedule;
import com.assetmanagement.assetmanagement.service.AssetService;
import com.assetmanagement.assetmanagement.service.MaintenanceScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/manager/maintenance")
public class MaintenanceScheduleController {
    @Autowired
    private MaintenanceScheduleService maintenanceService;
    @Autowired
    private AssetService assetService;

// user story 9: tao lich bao tri
    @PostMapping("/create")
    public MaintenanceSchedule createSchedule(@RequestBody MaintenanceSchedule schedule) {
        return maintenanceService.createSchedule(schedule);
    }
// xem danh sach bao tri
    @GetMapping("/all")
    public List<MaintenanceSchedule> getAllSchedules() {
        return maintenanceService.getAllSchedules();
    }

    @GetMapping("/assets")
    public List<Asset> getAllAssets() {
        return assetService.getAllAssets();
    }
}
