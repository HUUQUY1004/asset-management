
package com.assetmanagement.assetmanagement.repository;
import com.assetmanagement.assetmanagement.entity.MaintenanceSchedule;
import org.springframework.data.jpa.repository.JpaRepository;


import java.util.List;
public interface MaintenanceScheduleRepository extends JpaRepository<MaintenanceSchedule, Long> {
    List<MaintenanceSchedule> findByAssetId(Long assetId);
}