package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.app.entities.Login;
import com.app.entities.LoginCheck;
import com.app.entities.LoginResponse;
import com.app.services.LoginService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/login")
public class LoginController {

	@Autowired
	LoginService  loginService;

	@PostMapping("/checklogin")
	public ResponseEntity<LoginResponse> chklogin(@RequestBody LoginCheck lcheck) {
	    Login login = loginService.getLogin(lcheck.getUid(), lcheck.getPwd());

	    if (login != null) {
	        return ResponseEntity.ok(new LoginResponse(login));
	    } else {
	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new LoginResponse("Invalid credentials. Please try again."));
	    }
	}	
	
	@PutMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestParam String uid, @RequestParam String newPassword) {
        try {
            boolean isReset = loginService.resetPassword(uid, newPassword);
            if (isReset) {
                return ResponseEntity.ok("Password reset successfully");
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to reset password");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error resetting password: " + e.getMessage());
        }
    }
}