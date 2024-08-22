package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.app.entities.Group;
import com.app.entities.JoinRequest;
import com.app.entities.User;
import com.app.services.GroupService;
import com.app.services.UserRegService;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/groups")
public class GroupController {

	@Autowired
	GroupService groupService;
	
	@Autowired
    UserRegService userService;
	
	@PostMapping("/addgroup")
	public ResponseEntity<?> addHobby(@RequestBody Group h) {
	    try {
	        Group savedGroup = groupService.save(h);
	        return ResponseEntity.ok(savedGroup);
	    } catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error adding group: " + e.getMessage());
	    }
	}
	
	@GetMapping("/getallgroups")
	public ResponseEntity<?> getAllGroups() {
	    try {
	        List<Group> groups = groupService.getGroups();
	        return ResponseEntity.ok(groups);
	    } catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
	    }
	}

	@DeleteMapping("/deletegroup/{id}")
	public ResponseEntity<?> deleteGroup(@PathVariable int id) {
	    try {
	    	groupService.deleteGroupById(id);
	        return ResponseEntity.ok("Group deleted successfully");
	    } catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting hobby: " + e.getMessage());
	    }
	}
	
	
	
	@PostMapping("/join")
	public ResponseEntity<String> joinGroup(@RequestBody JoinRequest joinRequest) {
	    try {
	        int groupId = joinRequest.getGroupId();
	        int userId = joinRequest.getUserId();

	        groupService.addUserToGroup(groupId, userId);

	        return ResponseEntity.ok("User joined the group successfully");
	    } catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error joining group: " + e.getMessage());
	    }
	}

	@GetMapping("/user/{userId}/groups")
	public ResponseEntity<List<Group>> getUserGroups(@PathVariable int userId) {
	    try {
	        List<Group> groups = groupService.getUserGroups(userId);
	        return ResponseEntity.ok(groups);
	    } catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
	    }
	}
	
	 @GetMapping("/{groupId}/isMember/{userId}")
	    public ResponseEntity<Boolean> isUserMemberOfGroup(@PathVariable int groupId, @PathVariable int userId) {
	        boolean isMember = groupService.isUserMemberOfGroup(groupId, userId);
	        return ResponseEntity.ok(isMember);
	    }


}


