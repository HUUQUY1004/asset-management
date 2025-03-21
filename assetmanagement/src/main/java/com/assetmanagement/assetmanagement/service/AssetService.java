package com.assetmanagement.assetmanagement.service;

import com.assetmanagement.assetmanagement.dto.UpdateAssetRequets;
import com.assetmanagement.assetmanagement.entity.Asset;
import com.assetmanagement.assetmanagement.repository.AssetRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AssetService {

    @Autowired
    private AssetRepository assetRepository;


    public void deleteAsset(Long id) {
        Asset asset = assetRepository.findById(id).orElseThrow(() -> new RuntimeException("Asset not found"));
        asset.setDeleted(true);
        assetRepository.save(asset);
    }

    public Asset createAsset(Asset asset) {
        asset.setLastUpdated(LocalDateTime.now());
        return assetRepository.save(asset);
    }

    //user story 4
    public List<Asset> getAssetsByStatus(String status) {
        return assetRepository.findByStatus(status);
    }

    public Asset updateAsset(Long id, UpdateAssetRequets dto) {
        Asset asset = assetRepository.findById(id).orElseThrow(() -> new RuntimeException("Asset not found"));
        asset.setName(dto.getName());
        asset.setStatus(dto.getStatus());
        asset.setLocation(dto.getLocation());
        asset.setQuantity(dto.getQuantity());
        asset.setLastUpdated(LocalDateTime.now()); // Tự động cập nhật thời gian
        return assetRepository.save(asset);
    }
}