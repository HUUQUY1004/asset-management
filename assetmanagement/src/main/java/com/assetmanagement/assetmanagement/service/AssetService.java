package com.assetmanagement.assetmanagement.service;

import com.assetmanagement.assetmanagement.entity.Asset;
import com.assetmanagement.assetmanagement.repository.AssetRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

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

    public List<Asset> getAssetsByStatus(String status) {
        return assetRepository.findByStatus(status);
    }
}
