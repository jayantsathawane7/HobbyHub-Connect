package com.app.entities;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.*;

import com.app.entities.Login;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;


@JsonIgnoreProperties({"groupList"})
@Entity
@Getter
@Setter
@NoArgsConstructor
@ToString
@Table(name="users")
public class User {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="user_id")
    private int user_id;

    @Column(name="fname", nullable=false)
    private String fname;

    @Column(name="lname", nullable=false)
    private String lname;

    @Column(name="email", unique=true, nullable=false)
    private String email;

    @Column(name="contact")
    private String contact;


    @ManyToMany
    @JoinTable(
      name = "user_groups",
      joinColumns = @JoinColumn(name = "user_id"),
      inverseJoinColumns = @JoinColumn(name = "group_id"))
    private Set<Group> groupList = new HashSet<>();
    
    @OneToOne
    @JoinColumn(name="user_login_id")
    private Login login_id;

    
    public User(String fname, String lname, String email, String contact, Login login_id) 
	{
		super();
		this.fname = fname;
		this.lname = lname;
		this.email = email;
		this.contact = contact;
		this.login_id = login_id;
	}
  
}