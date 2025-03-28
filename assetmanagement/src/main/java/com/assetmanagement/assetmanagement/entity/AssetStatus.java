package com.assetmanagement.assetmanagement.entity;


public enum AssetStatus {
    IN_USE("Đang sử dụng"),
    MAINTENANCE("Bảo trì"),
    LIQUIDATED("Thanh lý");

    private final String description;

    AssetStatus(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }
}
