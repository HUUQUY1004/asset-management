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
    Long id;
    boolean is_deleted;
    String name;
    String status; // E.g., "in use", "available", etc.
    String location;
    int quantity;
    LocalDateTime lastUpdate;

    public String getName(){
        return name;
    }
    public void setName(String name){
        this.name = name;
    }
    public String getStatus(){
        return status;
    }
    public void setStatus(String status){
        this.status = status;
    }
    public String getLocation(){
        return location;
    }
    public void setLocation(String location){
        this.location = location;
    }
    public int getQuantity(){
        return quantity;
    }
    public void setQuantity(int quantity){
        this.quantity = quantity;
    }
    public LocalDateTime getLastUpdate(){
        return lastUpdate;
    }
    public void setLastUpdate(LocalDateTime lastUpdate){
        this.lastUpdate = lastUpdate;
    }
}
