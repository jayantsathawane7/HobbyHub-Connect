package com.app.repositories;

import com.app.entities.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {

    @Query(value = "SELECT * FROM notifications ORDER BY created_at DESC LIMIT :limit", nativeQuery = true)
    List<Notification> findTopByOrderByCreatedAtDesc(@Param("limit") int limit);
}
