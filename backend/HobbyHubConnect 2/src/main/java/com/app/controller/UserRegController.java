package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.app.entities.Group;
//import com.app.entities.AddTrek;
import com.app.entities.Login;
import com.app.entities.Role;
import com.app.entities.User;
import com.app.entities.UserReg;
import com.app.services.LoginService;
import com.app.services.RoleService;
import com.app.services.UserRegService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/registration")
public class UserRegController {
	
	@Autowired
	UserRegService uservice;
	
	@Autowired
	LoginService lservice;
	
	@Autowired
	RoleService rservice;
	
	
	
	@PostMapping("/userreg")
	public User regUser(@RequestBody UserReg ureg)
	{
		
		if (ureg.getPwd() == null || ureg.getPwd().isEmpty()) {
	        throw new IllegalArgumentException("Password cannot be null or empty");
	    }
		Role r=rservice.getRole(ureg.getRoleid());
		//Role r = rservice.getRole(1); // Default role ID for user
		Login l=new Login(ureg.getUid(),ureg.getPwd(),r);
		
		Login lsaved=lservice.save(l);
		
		User u=new User(ureg.getFname(),ureg.getLname(),ureg.getEmail(),ureg.getContact(),lsaved);
	
		return uservice.saveUser(u);
		
	}

	@GetMapping("/getallusers")
	public ResponseEntity<?> getAllUsers() {
	    try {
	        List<User> users = uservice.getUsers();
	        return ResponseEntity.ok(users);
	    } catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
	    }
	}
	
	@GetMapping("/userid/{loginId}")
    public Integer getUserIdByLoginId(@PathVariable String loginId) {
        return uservice.getUserIdByLoginId(loginId);
    }
	
	
	
	@GetMapping("profile/{userid}")
	public List<User>getUserIdByLoginid1(@PathVariable int userid)
	{
		return uservice.getUserBYId(userid);
	}
	
	@PostMapping("/updateprofile/{userId}")
    public User updateProfile(@PathVariable int userId, @RequestBody UserReg updatedUser) {
        return uservice.updateUser(userId, updatedUser);
    }

}
