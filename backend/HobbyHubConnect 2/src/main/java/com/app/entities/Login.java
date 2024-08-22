package com.app.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.app.entities.Role;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name="login")
public class Login {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int login_id;
	
	String uid;
	String pwd;
	
	
	
	@ManyToOne
	@JoinColumn(name="role_id")
	Role role_id;
	
	
	public Login(String uid, String pwd, Role role_id) {
		super();
		this.uid = uid;
		this.pwd = pwd;
		this.role_id = role_id;
	}
}