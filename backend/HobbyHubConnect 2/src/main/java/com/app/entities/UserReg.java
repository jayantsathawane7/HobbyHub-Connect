package com.app.entities;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
public class UserReg 
{
	    private int user_id;
	    private String uid;
	    private String pwd;
	    private String fname;
	    private String lname;
	    private String email;
	    private String contact;
	    private int roleid;
}

