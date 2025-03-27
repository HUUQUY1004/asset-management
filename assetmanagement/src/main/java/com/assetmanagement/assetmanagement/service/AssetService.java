package com.assetmanagement.assetmanagement.service;

import com.assetmanagement.assetmanagement.dto.UpdateAssetRequets;
import com.assetmanagement.assetmanagement.entity.Asset;
import com.assetmanagement.assetmanagement.entity.AssetLog;
import com.assetmanagement.assetmanagement.repository.AssetLogRepository;
import com.assetmanagement.assetmanagement.repository.AssetRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import com.assetmanagement.assetmanagement.entity.AssetLog;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;



@Service
@RequiredArgsConstructor
public class AssetService {

    @Autowired
    private AssetRepository assetRepository;
    @Autowired
    private AssetLogRepository assetLogRepository;

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

        // Lấy tên người dùng từ SecurityContextHolder
        SecurityContext context = SecurityContextHolder.getContext();
        String updatedBy = context.getAuthentication().getName();

        List<String> changes = new ArrayList<>();

        if (!dto.getName().equals(asset.getName())) {
            changes.add("Name: " + asset.getName() + " → " + dto.getName());
            asset.setName(dto.getName());
        }
        if (!dto.getStatus().equals(asset.getStatus())) {
            changes.add("Status: " + asset.getStatus() + " → " + dto.getStatus());
            asset.setStatus(dto.getStatus());
        }
        if (!dto.getLocation().equals(asset.getLocation())) {
            changes.add("Location: " + asset.getLocation() + " → " + dto.getLocation());
            asset.setLocation(dto.getLocation());
        }
        if (dto.getQuantity() != asset.getQuantity()) {
            changes.add("Quantity: " + asset.getQuantity() + " → " + dto.getQuantity());
            asset.setQuantity(dto.getQuantity());
        }

        asset.setLastUpdated(LocalDateTime.now());

        Asset updatedAsset = assetRepository.save(asset);

        // Ghi log nếu có thay đổi
        if (!changes.isEmpty()) {
            AssetLog log = new AssetLog();
            log.setAssetId(asset.getId());
            log.setUpdatedBy(updatedBy);
            log.setChanges(String.join(", ", changes));
            log.setUpdatedAt(LocalDateTime.now());
            assetLogRepository.save(log);
        }

        return updatedAsset;
    }

    public List<Asset> getAllAssets() {
        return assetRepository.findAll();
    }
    public Asset verifyAsset(Long id) {
        return assetRepository.findById(id).map(asset -> {
            asset.setVerified(true);
            return assetRepository.save(asset);
        }).orElseThrow(() -> new RuntimeException("Asset not found"));
    }

}