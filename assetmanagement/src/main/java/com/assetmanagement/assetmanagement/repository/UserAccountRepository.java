package com.assetmanagement.assetmanagement.repository;

import com.assetmanagement.assetmanagement.entity.UserAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserAccountRepository extends JpaRepository<UserAccount, Long> {
    // Custom queries if needed
}