package com.assetmanagement.assetmanagement.repository;

import com.assetmanagement.assetmanagement.entity.Notify;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface NotifyRepository extends JpaRepository<Notify, Long> {

    List<Notify> findAll();

}
