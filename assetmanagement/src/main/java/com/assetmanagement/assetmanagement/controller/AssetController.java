package com.assetmanagement.assetmanagement.controller;

import com.assetmanagement.assetmanagement.entity.Asset;
import com.assetmanagement.assetmanagement.repository.AssetRepository;
import com.assetmanagement.assetmanagement.service.AssetService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("manager/asset")
@RequiredArgsConstructor
public class AssetController {
    @Autowired
    private  AssetService assetService;
    @Autowired
    private  AssetRepository assetRepository;


    @GetMapping("/status/{status}")
    public ResponseEntity<List<Asset>> getAssetsByStatus(@PathVariable String status) {
        return ResponseEntity.ok(assetService.getAssetsByStatus(status));
    }
    @PostMapping("/{assetId}")
    public ResponseEntity<String> deletedAsset(@PathVariable("assetId") Long assetId) {
        assetService.deleteAsset(assetId);
        return ResponseEntity.ok("Deleted asset " + assetId);
    }
    @PostMapping("/create")
    public ResponseEntity<Asset> createAsset(@RequestBody Asset asset) {
        Asset newAsset = assetService.createAsset(asset);
        return ResponseEntity.ok(newAsset);
    }

}
