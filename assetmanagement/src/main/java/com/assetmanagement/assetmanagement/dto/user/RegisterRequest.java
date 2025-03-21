package com.assetmanagement.assetmanagement.dto.user;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterRequest {
    private String username;

    private String password;
}
