package com.app.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.app.entities.Group;

public interface GroupRepository extends JpaRepository<Group, Integer> {
	List<Group> findByIsActive(boolean isActive);
    @Query(value = "DELETE FROM user_groups WHERE group_id = :groupId", nativeQuery = true)
    @Modifying
    void removeGroupFromUsers(int groupId);

}
