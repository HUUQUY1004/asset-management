package com.assetmanagement.assetmanagement.repository;

import com.assetmanagement.assetmanagement.entity.AssetLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AssetLogRepository extends JpaRepository<AssetLog, Long> {
}
