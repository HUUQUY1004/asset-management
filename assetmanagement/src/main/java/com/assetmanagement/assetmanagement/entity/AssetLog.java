package com.assetmanagement.assetmanagement.entity;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class AssetLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long assetId;
    private String updatedBy;
    private String changes;
    private LocalDateTime updatedAt;

    public Long getAssetId() {
        return assetId;
    }

    public Long getId() {
        return id;
    }

    public String getUpdatedBy() {
        return updatedBy;
    }

    public String getChanges() {
        return changes;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setAssetId(Long assetId) {
        this.assetId = assetId;
    }

    public void setUpdatedBy(String updatedBy) {
        this.updatedBy = updatedBy;
    }

    public void setChanges(String changes) {
        this.changes = changes;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
