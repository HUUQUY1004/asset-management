package com.assetmanagement.assetmanagement.controller;

import com.assetmanagement.assetmanagement.dto.MaintenanceRequest;
import com.assetmanagement.assetmanagement.dto.UpdateAssetRequets;
import com.assetmanagement.assetmanagement.entity.Asset;
import com.assetmanagement.assetmanagement.entity.AssetMaintenanceHistory;
import com.assetmanagement.assetmanagement.repository.AssetRepository;
import com.assetmanagement.assetmanagement.response.Response;
import com.assetmanagement.assetmanagement.service.AssetService;
import com.assetmanagement.assetmanagement.service.NotifyService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

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

    @PutMapping("/approve/{assetId}")
    @PreAuthorize("hasAuthority('admin')")
    public ResponseEntity<Response> checkApprove(
            @PathVariable("assetId") Long assetId,
            @RequestHeader("Authorization") String jwt
    ) {
        Optional<Asset> assetOptional = assetService.getAssetById(assetId);
        if(assetOptional.isPresent()) {
            Asset asset = assetOptional.get();
            System.out.println("AssetId: " + assetId);
            System.out.println("Asset: " + asset.getName());

            assetService.approveBorrow(assetId);
            Response response = new Response();
            response.setMessage("Cho mượn tài sản thành công");
            response.setStatus(200);
//            notifyService.disableNotify();
            return ResponseEntity.ok(response);
        } else {
            Response response = new Response();
            response.setMessage("Không tìm thấy tài sản");
            response.setStatus(404);
            return ResponseEntity.ok(response);
        }
    }

    @PostMapping("/maintenance")
    public ResponseEntity<AssetMaintenanceHistory> recordMaintenance(@RequestBody MaintenanceRequest request) {
        AssetMaintenanceHistory record = assetService.saveMaintenanceHistory(request);
        return ResponseEntity.ok(record);
    }
}
