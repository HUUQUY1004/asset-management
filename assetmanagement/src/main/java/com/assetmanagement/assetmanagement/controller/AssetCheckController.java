import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/assets")
public class AssetCheckController {

    private final AssetCheckService assetCheckService;

    public AssetCheckController(AssetCheckService assetCheckService) {
        this.assetCheckService = assetCheckService;
    }

    @GetMapping
    public List<Asset> getAllAssets() {
        return assetCheckService.getAllAssets();
    }

    @PostMapping("/{assetId}/check")
    public void performCheck(@PathVariable Long assetId, @RequestParam String status, @RequestParam(required = false) String notes) {
        assetCheckService.performCheck(assetId, status, notes);
    }
}