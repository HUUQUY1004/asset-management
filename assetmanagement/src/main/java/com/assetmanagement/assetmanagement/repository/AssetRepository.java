package com.assetmanagement.assetmanagement.repository;

import com.assetmanagement.assetmanagement.entity.Asset;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface AssetRepository extends JpaRepository<Asset, Long> {
    List<Asset> findByStatus(String status);

    @Query("select  a from Asset a ")
    List<Asset> getAll();
}