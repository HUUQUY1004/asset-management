package com.assetmanagement.assetmanagement.controller;

import com.assetmanagement.assetmanagement.dto.UpdateAssetRequets;
import com.assetmanagement.assetmanagement.entity.Asset;
import com.assetmanagement.assetmanagement.repository.AssetRepository;
import com.assetmanagement.assetmanagement.service.AssetService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("manager/asset")
@RequiredArgsConstructor
public class AssetController {
    @Autowired
    private  AssetService assetService;
    @Autowired
    private  AssetRepository assetRepository;

    //user story 4
    @GetMapping("/status/{status}")
    public ResponseEntity<List<Asset>> getAssetsByStatus(@PathVariable String status) {
        return ResponseEntity.ok(assetService.getAssetsByStatus(status));
    }
    @PostMapping("delete/{assetId}")
    public ResponseEntity<String> deletedAsset(@PathVariable("assetId") Long assetId) {
        assetService.deleteAsset(assetId);
        return ResponseEntity.ok("Deleted asset " + assetId);
    }

    //user story 1
    @PostMapping
    public ResponseEntity<?> createAsset(@RequestBody Asset asset) {
        if (asset.getName() == null || asset.getName().trim().isEmpty()) {
            return ResponseEntity.badRequest().body("{\"message\": \"Tên tài sản không được để trống\"}");
        }
        asset.setLastUpdated(LocalDateTime.now());
        Asset savedAsset = assetService.createAsset(asset);
        return ResponseEntity.ok(savedAsset);
    }
    @PutMapping("/{id}")
    public ResponseEntity<Asset> updateAsset(
            @PathVariable Long id,
            @RequestBody UpdateAssetRequets dto) {
        Asset updatedAsset = assetService.updateAsset(id, dto);
        return ResponseEntity.ok(updatedAsset);
    }


}
