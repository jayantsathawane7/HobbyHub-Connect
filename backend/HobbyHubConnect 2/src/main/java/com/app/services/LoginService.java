package com.app.services;


import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.entities.Login;
import com.app.repositories.LoginRepository;

@Service
public class LoginService {
	@Autowired
	LoginRepository loginrepo;
	
//	public Login getLogin(String uid,String pwd)
//	{
//		Login l;
//		Optional<Login> ol=loginrepo.getLogin(uid, pwd);
//		try
//		{
//			l=ol.get();
//		}
//		catch(Exception e)
//		{
//			l=null;
//		}
//		
//		return l;
//	}
//	
	public Login getLogin(String uid, String pwd) {
        Optional<Login> ol = loginrepo.getLogin(uid,pwd);
        if (ol.isPresent()) {
            Login login = ol.get();
            if (pwd.equals(login.getPwd())) {  // Compare plain text password
                return login;
            }
        }
        return null;
    }

	
	public Login save (Login l)
	{
		return loginrepo.save(l);
	}
	


    public boolean resetPassword(String uid, String newPassword) {
        Login login = loginrepo.findByUid(uid);
        if (login == null) {
            return false; // UID not found
        }

        login.setPwd(newPassword); // Set new plain text password
        loginrepo.save(login);

        return true;
    }
	
}
