package com.app.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.entities.Group;
import com.app.entities.Hobby;
import com.app.repositories.HobbyRepository;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class HobbyService {
	
	@Autowired
	HobbyRepository hobbyRepo;
	
	@Autowired
    private NotificationService notificationService;

	public Hobby save(Hobby hobby) {
		 Hobby createdHobby = hobbyRepo.save(hobby);

	        // Notify all users about the new group
	        String message = "A new hobby has been created: " + createdHobby.getName();
	        notificationService.sendNotificationToAllUsers(message);

	        return createdHobby;
		//return hobbyRepo.save(hobby);
	}
	
	public Hobby getHobbyInfo(int id)
	{
		Optional<Hobby> hobbyData=hobbyRepo.findById(id);
		Hobby hobby=null;
		try
		{
			hobby=hobbyData.get();
		}
		catch(NoSuchElementException e)
		{
			hobby=null;
		}
		return hobby;
	}
	
	@Transactional(readOnly = true)
	 public List<Hobby> getAllHobbies() {	
			
			return hobbyRepo.findAll();
		}

	
	public void deleteHobbyById(int id) {
	    try {
	        hobbyRepo.deleteById(id);
	    } catch (DataIntegrityViolationException e) {
	        throw new RuntimeException("Cannot delete hobby, constraint violation: " + e.getMessage());
	    }
	}
	
	    public List<Hobby> getHobbiesByUserId(Integer userId) {
	        return hobbyRepo.findByUserIdAndIsActiveTrue(userId);
	    }

	    

}
