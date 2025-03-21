package com.assetmanagement.assetmanagement.repository;

import com.assetmanagement.assetmanagement.entity.Asset;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AssetRepository extends JpaRepository<Asset, Long> {
}
