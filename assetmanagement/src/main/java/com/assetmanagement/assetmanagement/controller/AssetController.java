package com.assetmanagement.assetmanagement.controller;

import com.assetmanagement.assetmanagement.DTO.MaintenanceRequest;
import com.assetmanagement.assetmanagement.dto.UpdateAssetRequets;
import com.assetmanagement.assetmanagement.entity.Asset;
import com.assetmanagement.assetmanagement.entity.AssetMaintenanceHistory;
import com.assetmanagement.assetmanagement.repository.AssetRepository;
import com.assetmanagement.assetmanagement.service.AssetService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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
        return ResponseEntity.ok(assetRepository.findByStatus(status));
    }
    @DeleteMapping("delete/{assetId}")
    @PreAuthorize("hasAuthority('admin')")
    public ResponseEntity<String> deletedAsset(@PathVariable("assetId") Long assetId) {
        System.out.println( "assetId"+ assetId);
        assetService.deleteAsset(assetId);
        return ResponseEntity.ok("Deleted asset " + assetId);
    }

    //user story 1
    @PostMapping("/create")
    public ResponseEntity<?> createAsset(@RequestBody Asset asset) {
        System.out.println("asset" + asset);
        if (asset.getName() == null || asset.getName().trim().isEmpty()) {
            return ResponseEntity.badRequest().body("{\"message\": \"Tên tài sản không được để trống\"}");
        }
        asset.setLastUpdated(LocalDateTime.now());
        Asset savedAsset = assetService.createAsset(asset);
        return ResponseEntity.ok(savedAsset);
    }

    @GetMapping("get-all-asset/{status}")
    public ResponseEntity<List<Asset>> getAllAsset(
            @PathVariable("status") String status
    ){
        System.out.println(status);
        System.out.println("===========>");
        if("Tất cả".equals(status)){
            return ResponseEntity.ok(assetRepository.getAll());
        }
        else {
            return  ResponseEntity.ok(assetRepository.getAssetByStatus(status));
        }
    }
    @PutMapping("/{id}")
    public ResponseEntity<?> updateAsset(@PathVariable Long id, @RequestBody UpdateAssetRequets dto) {
        System.out.println("dto" + dto.getQuantity());
        Asset updatedAsset = assetService.updateAsset(id, dto);
        return ResponseEntity.ok(updatedAsset);
    }


    @PostMapping("/maintenance")
    public ResponseEntity<AssetMaintenanceHistory> recordMaintenance(@RequestBody MaintenanceRequest request) {
        System.out.println(request.toString());
        AssetMaintenanceHistory record = assetService.saveMaintenanceHistory(request);
        return ResponseEntity.ok(record);
    }

}
