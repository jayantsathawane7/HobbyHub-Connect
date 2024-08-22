package com.app.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;

import com.app.entities.Hobby;

public interface HobbyRepository extends JpaRepository<Hobby, Integer>{

//	void deleteById(int id);
	
	 List<Hobby> findByUserIdAndIsActiveTrue(Integer userId);

	    // Custom query to handle soft deletion
	    @Modifying
	    @Query("UPDATE Hobby h SET h.isActive = false WHERE h.id = :id")
	    void deleteById(@Param("id") int id);

}