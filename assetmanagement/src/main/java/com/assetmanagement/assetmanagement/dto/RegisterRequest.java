package com.assetmanagement.assetmanagement.dto;

import lombok.Getter;
import lombok.Setter;

//@Getter
//@Setter
public class RegisterRequest {
    private String username;

    private String password;

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }
}
