package com.assetmanagement.assetmanagement.createAsset.service;

import com.assetmanagement.assetmanagement.entity.Asset;
import com.assetmanagement.assetmanagement.createAsset.repository.AssetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class AssetService {

    private final AssetRepository assetRepository;
    //command

    @Autowired
    public AssetService(AssetRepository assetRepository) {
        this.assetRepository = assetRepository;
    }

    public Asset createAsset(Asset asset) {
        asset.setLastUpdated(LocalDateTime.now());
        return assetRepository.save(asset);
    }

    public List<Asset> getAssetsByStatus(String status) {
        return assetRepository.findByStatus(status);
    }
}

