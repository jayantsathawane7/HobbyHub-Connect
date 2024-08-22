package com.app.services;

import com.app.entities.Notification;
import com.app.repositories.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    public List<Notification> getAllNotifications() {
        return notificationRepository.findAll();
    }

    public Notification getNotificationById(Long id) {
        return notificationRepository.findById(id).orElse(null);
    }

    public List<Notification> getLatestNotifications(int limit) {
        return notificationRepository.findTopByOrderByCreatedAtDesc(limit);
    }
    
    public void sendNotificationToAllUsers(String message) {
        // Save notification
        Notification notification = new Notification();
        notification.setMessage(message);
        notificationRepository.save(notification);

//        // Distribute notification to all users
//        List<User> users = userRepository.findAll();
//        for (User user : users) {
//            // Implement logic to send notification to each user, e.g., via email or push notification
//            // This example assumes you have a way to send notifications to users
//            // Example: sendNotificationToUser(user, notification);
//        }
    }
}

