package com.app.controller;

import com.app.entities.Hobby;
import com.app.services.HobbyService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import com.app.entities.HobbyRequest;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/hobbies")
public class HobbyController {
	
	@Autowired
	HobbyService hobbyService;
	
	
	
	@PostMapping("/addhobby")
	public ResponseEntity<?> addHobby(@RequestBody HobbyRequest request) {
	    try {
	        Hobby hobby = new Hobby();
	        hobby.setName(request.getName());
	        hobby.setDescription(request.getDescription());
	        hobby.setUserId(request.getUserId());
	        hobby.setActive(true); // Set isActive to true when adding
	        
	        Hobby savedHobby = hobbyService.save(hobby);
	        return ResponseEntity.ok(savedHobby);
	    } catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error adding hobby: " + e.getMessage());
	    }
	}

    @GetMapping("/getallhobbies")
    public ResponseEntity<?> getHobbies() {
        try {
            List<Hobby> hobbies = hobbyService.getAllHobbies();
            return ResponseEntity.ok(hobbies);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/gethobbiesbyuser/{userId}")
    public ResponseEntity<List<Hobby>> getHobbiesByUserId(@PathVariable Integer userId) {
        List<Hobby> hobbies = hobbyService.getHobbiesByUserId(userId);
        if (hobbies != null && !hobbies.isEmpty()) {
            return ResponseEntity.ok(hobbies);
        } else {
            return ResponseEntity.noContent().build(); // 204 No Content if no hobbies found
        }
    }

    @DeleteMapping("/deletehobby/{id}")
    public ResponseEntity<?> deleteHobby(@PathVariable int id) {
        try {
            hobbyService.deleteHobbyById(id);
            return ResponseEntity.ok("Hobby soft deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting hobby: " + e.getMessage());
        }
    }
	
	


}
