package com.assetmanagement.assetmanagement.repository;

import com.assetmanagement.assetmanagement.entity.Asset;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface AssetRepository extends JpaRepository<Asset, Long> {
    List<Asset> findByStatus(String status);

    @Query("select  a from Asset a  where  a.isDeleted = false")
    List<Asset> getAll();

    @Query("select a from Asset  a where a.isDeleted = false AND  a.status  like %:status%  ")
    List<Asset> getAssetByStatus(@Param(("status")) String status);
}