package com.assetmanagement.assetmanagement.service;

import com.assetmanagement.assetmanagement.dto.UpdateAssetRequets;
import com.assetmanagement.assetmanagement.entity.Asset;
import com.assetmanagement.assetmanagement.repository.AssetRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class AssetService {
    AssetRepository assetRepository;
    public Asset updateAsset(Long assetId, UpdateAssetRequets request) {
        Optional<Asset> assetOptional = assetRepository.findById(assetId);
        if (assetOptional.isPresent()) {
            Asset asset = assetOptional.get();
            asset.setName(request.getName());
            asset.setStatus(request.getStatus());
            asset.setLocation(request.getLocation());
            asset.setQuantity(request.getQuantity());
            asset.setLastUpdated(LocalDateTime.now()); // Tự động cập nhật thời gian
            return assetRepository.save(asset);
        } else {
            throw new RuntimeException("Asset not found with ID: " + assetId);
        }}
}
