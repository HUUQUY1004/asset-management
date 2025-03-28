package com.assetmanagement.assetmanagement.controller;

import com.assetmanagement.assetmanagement.entity.Asset;
import com.assetmanagement.assetmanagement.entity.Notify;
import com.assetmanagement.assetmanagement.repository.NotifyRepository;
import com.assetmanagement.assetmanagement.response.Response;
import com.assetmanagement.assetmanagement.security.JwtService;
import com.assetmanagement.assetmanagement.service.AssetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("manager/borrow-asset")
public class BorrowController {
    @Autowired
    private NotifyRepository notifyRepository;
    @Autowired
    private AssetService assetService;
    @Autowired
    private JwtService jwtService;

    @GetMapping("/{assetId}")
    public ResponseEntity<Response> borrowAsset(
            @PathVariable("assetId") Long assetId,
            @RequestHeader("Authorization") String jwt
    ) {
        Optional<Asset> assetOptional = assetService.getAssetById(assetId);
        jwt = jwt.substring(7).trim();
        if (assetOptional.isPresent()) {
            Asset asset = assetOptional.get(); // Lấy giá trị Asset từ Optional
            System.out.println("AssetId: " + assetId);
            System.out.println("Asset: " + asset.getName());


            Notify notify = new Notify();
            notify.setMessage(jwtService.extractUserName(jwt) + " muốn mượn tài sản " + asset.getName());
            notify.setRedirect("manager/asset/approve/" + asset.getId());
            notifyRepository.save(notify);

            Response response = new Response();
            response.setMessage("Mượn tài sản thành công");
            response.setStatus(200);
            return ResponseEntity.ok(response);
        } else {
            Response response = new Response();
            response.setMessage("Không tìm thấy tài sản");
            response.setStatus(404);
            return ResponseEntity.ok(response);
        }
    }
}
