package com.app.controller;

import com.app.entities.Notification;
import com.app.services.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/notifications")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    @GetMapping
    public ResponseEntity<List<Notification>> getAllNotifications() {
        List<Notification> notifications = notificationService.getAllNotifications();
        return ResponseEntity.ok(notifications);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Notification> getNotificationById(@PathVariable Long id) {
        Notification notification = notificationService.getNotificationById(id);
        if (notification != null) {
            return ResponseEntity.ok(notification);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/latest")
    public ResponseEntity<List<Notification>> getLatestNotifications(
            @RequestParam(value = "limit", defaultValue = "6") int limit) {
        List<Notification> notifications = notificationService.getLatestNotifications(limit);
        return ResponseEntity.ok(notifications);
    }
  
}
