package com.assetmanagement.assetmanagement.lebaphung;

import com.assetmanagement.assetmanagement.entity.Asset;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AssetService {
    private final AssetRepository assetRepository;

    public void deleteAsset(Long id) {
        Asset asset = assetRepository.findById(id).orElseThrow(() -> new RuntimeException("Asset not found"));
        asset.setDeleted(true);
        assetRepository.save(asset);
    }
}
