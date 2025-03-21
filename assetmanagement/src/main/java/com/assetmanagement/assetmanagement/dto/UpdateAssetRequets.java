package com.assetmanagement.assetmanagement.dto;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UpdateAssetRequets {
    String name;
    String status; // E.g., "in use", "available", etc.
    String location;
    int quantity;
    LocalDateTime lastUpdate;
}
