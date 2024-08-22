package com.app.services;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.entities.Group;
import com.app.entities.User;
import com.app.repositories.GroupRepository;
import com.app.repositories.UserRegRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class GroupService {

    @Autowired
    private GroupRepository groupRepo;

    @Autowired
    private UserRegRepository userRepository;
    
    @Autowired
    private NotificationService notificationService;

    public Group save(Group group) {
      
        Group createdGroup = groupRepo.save(group);

        // Notify all users about the new group
        String message = "A new group has been created: " + createdGroup.getName();
        notificationService.sendNotificationToAllUsers(message);

        return createdGroup;
    }

    public Group groupInfo(int id) {
        return groupRepo.findById(id)
            .filter(Group::isActive) // Ensure the group is active
            .orElse(null);
    }

    @Transactional(readOnly = true)
    public List<Group> getGroups() {
        return groupRepo.findByIsActive(true); // Fetch only active groups
    }

    @Transactional
    public void deleteGroupById(int id) {
        Group group = groupRepo.findById(id)
            .filter(Group::isActive) // Ensure the group is active
            .orElseThrow(() -> new RuntimeException("Group not found with id: " + id));

        // Remove the association between the group and all users in the user_group table
        groupRepo.removeGroupFromUsers(id);

        // Set isActive to false instead of deleting
        group.setActive(false);
        groupRepo.save(group);
    }

    public User getUserById(int userId) {
        return userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public Group getGroupById(int id) {
        return groupRepo.findById(id)
            .filter(Group::isActive) // Ensure the group is active
            .orElse(null);
    }

    @Transactional
    public void addUserToGroup(int groupId, int userId) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));
        Group group = groupRepo.findById(groupId)
            .filter(Group::isActive) // Ensure the group is active
            .orElseThrow(() -> new RuntimeException("Group not found"));

        user.getGroupList().add(group); // Add group to user's list
        group.getUsers().add(user);     // Add user to group's list

        userRepository.save(user);
        groupRepo.save(group);
    }

    @Transactional(readOnly = true)
    public List<Group> getUserGroups(int userId) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));

        List<Group> activeGroups = new ArrayList<>();
        for (Group group : user.getGroupList()) {
            if (group.isActive()) {
                activeGroups.add(group);
            }
        }
        return activeGroups;
    }
   
    @Transactional(readOnly = true)
    public boolean isUserMemberOfGroup(int groupId, int userId) {
        Group group = groupRepo.findById(groupId)
            .filter(Group::isActive)
            .orElseThrow(() -> new RuntimeException("Group not found"));

        return group.getUsers().stream().anyMatch(user -> user.getUser_id() == userId);
    }

}
