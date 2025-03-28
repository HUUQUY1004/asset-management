package com.assetmanagement.assetmanagement.repository;

import com.assetmanagement.assetmanagement.entity.AssetMaintenanceHistory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MaintenanceHistory extends JpaRepository<AssetMaintenanceHistory, Long> {
}
