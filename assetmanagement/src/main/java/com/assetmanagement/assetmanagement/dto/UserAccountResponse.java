package com.assetmanagement.assetmanagement.DTO;

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

    // Constructor (private để bắt buộc sử dụng builder)
    public UserAccountResponse(Long id, String username, String role, String status) {
        this.id = id;
        this.username = username;
        this.role = role;
        this.status = status;
    }

    public UserAccountResponse() {

    }

    // Getters
    public Long getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public String getRole() {
        return role;
    }

    public String getStatus() {
        return status;
    }

    // Phương thức builder()
    public static UserAccountResponseBuilder builder() {
        return new UserAccountResponseBuilder();
    }

    // Inner Class Builder
    public static class UserAccountResponseBuilder {
        private Long id;
        private String username;
        private String role;
        private String status;

        public UserAccountResponseBuilder id(Long id) {
            this.id = id;
            return this;
        }

        public UserAccountResponseBuilder username(String username) {
            this.username = username;
            return this;
        }

        public UserAccountResponseBuilder role(String role) {
            this.role = role;
            return this;
        }

        public UserAccountResponseBuilder status(String status) {
            this.status = status;
            return this;
        }

        // Tạo đối tượng UserAccountResponse
        public UserAccountResponse build() {
            return new UserAccountResponse(id, username, role, status);
        }
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
