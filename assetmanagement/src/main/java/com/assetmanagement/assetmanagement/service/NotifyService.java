package com.assetmanagement.assetmanagement.service;

import com.assetmanagement.assetmanagement.entity.Notify;
import com.assetmanagement.assetmanagement.repository.NotifyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class NotifyService {
    @Autowired
    private NotifyRepository notifyRepository;

    public List<Notify> getNotifies() {
        return notifyRepository.findAll();
    }

    public Optional<Notify> findNotifyById(Long id) {
        return notifyRepository.findById(id);
    }
}
