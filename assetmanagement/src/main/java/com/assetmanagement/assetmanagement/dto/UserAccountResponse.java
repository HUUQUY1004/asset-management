package com.assetmanagement.assetmanagement.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class UserAccountResponse {
    private Long id;
    private String username;
    private String role;
    private String status;
}
