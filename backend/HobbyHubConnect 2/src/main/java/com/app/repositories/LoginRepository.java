package com.app.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.app.entities.Login;

@Repository
public interface LoginRepository extends JpaRepository<Login,Integer> {

	@Query("select l from Login l where uid = :uid and pwd = :pwd")
	public Optional<Login>getLogin(String uid,String pwd);


	public Login findByUid(String uid);
}
