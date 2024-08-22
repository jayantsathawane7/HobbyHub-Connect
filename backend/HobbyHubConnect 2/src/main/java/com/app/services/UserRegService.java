package com.app.services;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.entities.Group;
//import com.app.entities.AddTrek;
import com.app.entities.Login;
import com.app.entities.User;
import com.app.entities.UserReg;
import com.app.repositories.UserRegRepository;

@Transactional
@Service
public class UserRegService {
	
	@Autowired
	UserRegRepository regrepo;
	
	public User saveUser(User u)
	{
		return regrepo.save(u);
	}
	
	
	public User getUserInfo(int id)
	{
		System.out.println(id+"");
		//return regrepo.findById(id);
	
		Optional<User> u=regrepo.findById(id);
		
		User up=null;
		try
		{
			up=u.get();
		}
		catch(NoSuchElementException e)
		{
			e.printStackTrace();
			System.out.println(e.getMessage());
		}
		return up;
	}

	public List<User> getUsersByRoleId(int roleId) {
        return regrepo.getUsersByRoleId(roleId);
    }
	

	
	 public Integer getUserIdByLoginId(String loginId) {
	        return regrepo.findUserIdByLoginId(loginId);
	    }
	
	 
	 public List<User> getUserBYId(int userid)
		{
			return regrepo.findUserIdByLoginId1(userid);
		}
	 
	 
	 
	 public User updateUser(int userId, UserReg updatedUser) {
	        User existingUser = regrepo.findById(userId)
	                                   .orElseThrow(() -> new NoSuchElementException("User not found"));

	        existingUser.setFname(updatedUser.getFname());
	        existingUser.setLname(updatedUser.getLname());
	        existingUser.setEmail(updatedUser.getEmail());
	        existingUser.setContact(updatedUser.getContact());

	        return regrepo.save(existingUser); // Use save method to update the entity
	    }

	public List<User> getUsers() {
		// TODO Auto-generated method stub
		return regrepo.findAll();
	}

	public User getUserById(int userId) {
        return regrepo.findById(userId).orElse(null);
    }
	
}

