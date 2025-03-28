
package com.assetmanagement.assetmanagement.repository;
import com.assetmanagement.assetmanagement.DTO.MaintenanceScheduleDTO;
import com.assetmanagement.assetmanagement.entity.MaintenanceSchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


import java.util.List;
public interface MaintenanceScheduleRepository extends JpaRepository<MaintenanceSchedule, Long> {
    List<MaintenanceSchedule> findByAssetId(Long assetId);

    @Query("SELECT new com.assetmanagement.assetmanagement.DTO.MaintenanceScheduleDTO(" +
            "m.id, m.assetId, m.frequency, m.nextMaintenanceDate, a.name) " +
            "FROM MaintenanceSchedule m JOIN Asset a ON m.assetId = a.id")
    List<MaintenanceScheduleDTO> getMaintenanceSchedule();
}